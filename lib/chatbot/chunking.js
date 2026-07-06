import crypto from "node:crypto";

const MAX_CHUNK_CHARS = 1400;

export function stableId(input) {
  return crypto.createHash("sha256").update(input).digest("hex").slice(0, 32);
}

export function normaliseText(value = "") {
  return String(value)
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function splitLongText(text, maxChars = MAX_CHUNK_CHARS) {
  const clean = normaliseText(text);
  if (clean.length <= maxChars) return [clean].filter(Boolean);

  const paragraphs = clean.split(/\n{2,}/);
  const chunks = [];
  let current = "";

  for (const paragraph of paragraphs) {
    if ((current + "\n\n" + paragraph).trim().length > maxChars && current) {
      chunks.push(current.trim());
      current = paragraph;
    } else {
      current = `${current}\n\n${paragraph}`.trim();
    }
  }

  if (current) chunks.push(current.trim());
  return chunks.flatMap((chunk) => {
    if (chunk.length <= maxChars) return [chunk];
    const sentences = chunk.match(/[^.!?]+[.!?]+|\S+/g) || [chunk];
    const sentenceChunks = [];
    let currentSentenceChunk = "";
    for (const sentence of sentences) {
      if ((currentSentenceChunk + " " + sentence).trim().length > maxChars && currentSentenceChunk) {
        sentenceChunks.push(currentSentenceChunk.trim());
        currentSentenceChunk = sentence;
      } else {
        currentSentenceChunk = `${currentSentenceChunk} ${sentence}`.trim();
      }
    }
    if (currentSentenceChunk) sentenceChunks.push(currentSentenceChunk.trim());
    return sentenceChunks;
  });
}

export function chunkMarkdownSections(text, baseMetadata = {}) {
  const clean = normaliseText(text);
  const sections = [];
  const headingPattern = /^(#{1,6}\s+|[0-9]+\.\s+|[A-Z][A-Z0-9 &'/-]{6,}$)(.+)?$/gm;
  const matches = [...clean.matchAll(headingPattern)];

  if (!matches.length) {
    return createChunks([clean], baseMetadata);
  }

  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const start = match.index;
    const end = matches[index + 1]?.index ?? clean.length;
    const rawSection = clean.slice(start, end).trim();
    const headingLine = rawSection.split("\n")[0].replace(/^#{1,6}\s+/, "").trim();
    sections.push({ heading: headingLine, text: rawSection });
  }

  return sections.flatMap((section) =>
    createChunks(splitLongText(section.text), {
      ...baseMetadata,
      sectionHeading: section.heading
    })
  );
}

export function createChunks(textParts, metadata = {}) {
  return textParts
    .map(normaliseText)
    .filter(Boolean)
    .map((content, index) => {
      const id = stableId(`${metadata.sourceType || "source"}:${metadata.slug || metadata.url || metadata.title || "item"}:${metadata.sectionHeading || ""}:${index}:${content}`);
      return {
        id,
        content,
        metadata: {
          priority: 0.5,
          ...metadata
        }
      };
    });
}

export function dedupeChunks(chunks) {
  const seen = new Set();
  return chunks.filter((chunk) => {
    const key = normaliseText(chunk.content).toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
