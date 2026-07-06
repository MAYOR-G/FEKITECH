import fs from "node:fs/promises";
import path from "node:path";

const INDEX_PATH = path.join(process.cwd(), "data", "chatbot-index.json");
const VECTOR_NAMESPACE = "fekitech-chatbot";

export function hasUpstashVectorConfig() {
  return Boolean(process.env.UPSTASH_VECTOR_REST_URL && process.env.UPSTASH_VECTOR_REST_TOKEN);
}

async function upstashRequest(endpoint, payload) {
  const baseUrl = process.env.UPSTASH_VECTOR_REST_URL?.replace(/\/$/, "");
  const token = process.env.UPSTASH_VECTOR_REST_TOKEN;
  if (!baseUrl || !token) {
    throw new Error("Upstash Vector is not configured.");
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Upstash Vector request failed with ${response.status}.`);
  }

  return response.json();
}

export async function saveLocalIndex(chunks) {
  await fs.mkdir(path.dirname(INDEX_PATH), { recursive: true });
  await fs.writeFile(
    INDEX_PATH,
    JSON.stringify({ updatedAt: new Date().toISOString(), chunks }, null, 2)
  );
}

export async function loadLocalIndex() {
  try {
    const raw = await fs.readFile(INDEX_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.chunks) ? parsed.chunks : [];
  } catch {
    return [];
  }
}

export async function upsertChunks(chunks) {
  await saveLocalIndex(chunks);

  if (!hasUpstashVectorConfig()) {
    return { mode: "local", count: chunks.length };
  }

  const batchSize = 50;
  for (let index = 0; index < chunks.length; index += batchSize) {
    const batch = chunks.slice(index, index + batchSize).map((chunk) => ({
      id: chunk.id,
      data: chunk.content,
      metadata: {
        ...chunk.metadata,
        content: chunk.content
      }
    }));

    // This expects an Upstash Vector index configured with hosted embeddings.
    // If your index requires explicit numeric vectors, add an embedding provider here.
    await upstashRequest("/upsert", {
      namespace: VECTOR_NAMESPACE,
      vectors: batch
    });
  }

  return { mode: "upstash", count: chunks.length };
}

function keywordScore(query, chunk) {
  const text = `${chunk.content || ""} ${Object.values(chunk.metadata || {}).join(" ")}`.toLowerCase();
  const terms = query.toLowerCase().split(/[^a-z0-9+]+/).filter((term) => term.length > 2);
  if (!terms.length) return 0;

  const hits = terms.reduce((score, term) => score + (text.includes(term) ? 1 : 0), 0);
  const priority = Number(chunk.metadata?.priority || 0.5);
  return hits / terms.length + priority;
}

export async function queryVectorStore(query, topK = 12) {
  if (hasUpstashVectorConfig()) {
    try {
      const result = await upstashRequest("/query", {
        namespace: VECTOR_NAMESPACE,
        data: query,
        topK,
        includeMetadata: true,
        includeData: true
      });

      const matches = Array.isArray(result?.result) ? result.result : Array.isArray(result) ? result : [];
      return matches.map((match) => ({
        id: match.id,
        score: match.score || 0,
        content: match.data || match.metadata?.content || "",
        metadata: match.metadata || {}
      }));
    } catch {
      // Fall through to local keyword retrieval so the assistant still works in development.
    }
  }

  const chunks = await loadLocalIndex();
  return chunks
    .map((chunk) => ({ ...chunk, score: keywordScore(query, chunk) }))
    .filter((chunk) => chunk.score > 0.05)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
