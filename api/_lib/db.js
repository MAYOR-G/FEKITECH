import crypto from "node:crypto";
import postgres from "postgres";

let sqlClient;
let schemaReady;

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required.");
  }

  if (!sqlClient) {
    sqlClient = postgres(process.env.DATABASE_URL, {
      max: 1,
      ssl: process.env.POSTGRES_SSL === "false" ? false : "require",
      idle_timeout: 20,
      connect_timeout: 10
    });
  }

  return sqlClient;
}

export async function ensureSchema() {
  if (schemaReady) return schemaReady;

  schemaReady = (async () => {
    const sql = getSql();
    await sql`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id TEXT PRIMARY KEY,
        sender_email TEXT NOT NULL,
        sender_name TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        direction TEXT NOT NULL DEFAULT 'inbound',
        meta JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS contact_messages_sender_created_idx
      ON contact_messages (LOWER(sender_email), created_at DESC)
    `;
  })();

  return schemaReady;
}

function newId() {
  return crypto.randomUUID();
}

export async function storeMessage({ senderEmail, senderName, subject, message, direction = "inbound", meta = {} }) {
  await ensureSchema();
  const sql = getSql();
  const [row] = await sql`
    INSERT INTO contact_messages (id, sender_email, sender_name, subject, message, direction, meta)
    VALUES (${newId()}, ${senderEmail}, ${senderName}, ${subject}, ${message}, ${direction}, ${sql.json(meta)})
    RETURNING id, sender_email, sender_name, subject, message, direction, created_at
  `;
  return row;
}

export async function getConversations() {
  await ensureSchema();
  const sql = getSql();
  return sql`
    WITH ranked AS (
      SELECT
        sender_email,
        sender_name,
        subject,
        message,
        direction,
        created_at,
        ROW_NUMBER() OVER (PARTITION BY LOWER(sender_email) ORDER BY created_at DESC) AS row_number,
        COUNT(*) OVER (PARTITION BY LOWER(sender_email)) AS message_count
      FROM contact_messages
    )
    SELECT
      sender_email AS email,
      sender_name AS name,
      subject,
      message AS preview,
      direction,
      created_at AS "lastMessageAt",
      message_count AS "messageCount"
    FROM ranked
    WHERE row_number = 1
    ORDER BY created_at DESC
  `;
}

export async function getThread(senderEmail) {
  await ensureSchema();
  const sql = getSql();
  return sql`
    SELECT
      id,
      sender_email AS email,
      sender_name AS name,
      subject,
      message,
      direction,
      created_at AS "createdAt"
    FROM contact_messages
    WHERE LOWER(sender_email) = LOWER(${senderEmail})
    ORDER BY created_at ASC
  `;
}

export async function deleteMessagesOlderThan(days = 90) {
  await ensureSchema();
  const sql = getSql();
  const [row] = await sql`
    WITH deleted AS (
      DELETE FROM contact_messages
      WHERE created_at < NOW() - (${days}::text || ' days')::interval
      RETURNING id
    )
    SELECT COUNT(*)::int AS count FROM deleted
  `;
  return row.count;
}
