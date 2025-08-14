import fs from "fs/promises";
import path from "path";
import { CONFIG } from "./env";

// naive tokenizer
function tokens(s: string) {
  return (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function jaccard(a: string, b: string) {
  const A = new Set(tokens(a));
  const B = new Set(tokens(b));
  const inter = new Set([...A].filter(x => B.has(x)));
  const uni = new Set([...A, ...B]);
  return uni.size ? inter.size / uni.size : 0;
}

export type LocalChunk = {
  id: string;
  text: string;
  source?: string;
};

type LocalDb = {
  chunks: LocalChunk[];
};

export async function localSearch(query: string, k = 4) {
  const dbPath = path.join(process.cwd(), "db", "localrag.json");
  let db: LocalDb | null = null;
  try {
    const raw = await fs.readFile(dbPath, "utf-8");
    db = JSON.parse(raw) as LocalDb;
  } catch {
    // no local db
  }

  if (!db?.chunks?.length) return [];

  const scored = db.chunks
    .map((c) => ({ ...c, score: jaccard(query, c.text) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);

  return scored;
}

// Optional: Upstash Vector REST search if configured
export async function upstashSearch(query: string, k = 4) {
  if (!CONFIG.upstashUrl || !CONFIG.upstashToken) return [];
  const url = `${CONFIG.upstashUrl}/query`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CONFIG.upstashToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: query, topK: k }),
    });
    if (!res.ok) return [];
    const data = await res.json();
    // Normalize to LocalChunk shape
    return (data?.matches || []).map((m: any, i: number) => ({
      id: m.id ?? `upstash-${i}`,
      text: m.text ?? m.metadata?.text ?? "",
      source: m.metadata?.source,
      score: m.score,
    }));
  } catch {
    return [];
  }
}

export async function getContext(query: string, k = 4) {
  // prefer local first (fast + private), then Upstash
  const local = await localSearch(query, k);
  if (local.length) return local;
  const cloud = await upstashSearch(query, k);
  return cloud;
}
