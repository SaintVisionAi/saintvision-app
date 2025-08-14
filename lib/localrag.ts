import fs from "fs";

type Chunk = { text: string; tf: Record<string, number> };
type Doc = { path: string; title: string; chunks: Chunk[] };
type Index = { totalChunks: number; idf: Record<string, number>; docs: Doc[] };

const INDEX_PATH = "db/localrag.json";
let INDEX: Index | null = null;

const STOP = new Set(("a,an,the,and,or,but,if,then,else,for,of,at,by,to,from,into,onto,with,without,over,under,between,within," +
  "is,are,was,were,be,been,being,do,does,did,done,can,could,should,would,may,might,will,shall," +
  "in,on,as,that,this,these,those,it,its,you,your,me,my,we,our,they,their").split(","));
const TOKEN = /[a-z0-9]+/g;

function tokenize(q: string){
  const out: string[] = [];
  const lower = q.toLowerCase();
  let m: RegExpExecArray | null;
  while((m = TOKEN.exec(lower))){
    const t = m[0];
    if (t.length < 2 || STOP.has(t)) continue;
    out.push(t);
  }
  return out;
}

function ensureIndex(): Index{
  if (!INDEX){
    INDEX = JSON.parse(fs.readFileSync(INDEX_PATH, "utf8"));
  }
  return INDEX!;
}

function cosineSparse(a: Record<string, number>, b: Record<string, number>){
  let dot = 0, na = 0, nb = 0;
  for (const [t,wa] of Object.entries(a)){ if (b[t]) dot += wa * b[t]; na += wa*wa; }
  for (const [,wb] of Object.entries(b)) nb += wb*wb;
  return dot / (Math.sqrt(na)*Math.sqrt(nb) + 1e-8);
}

export function searchLocal(query: string, k=5){
  const idx = ensureIndex();
  const toks = tokenize(query);
  const qtf: Record<string, number> = {};
  for (const t of toks) qtf[t] = (qtf[t]||0) + 1;

  // build q tf-idf
  const qvec: Record<string, number> = {};
  for (const [t,f] of Object.entries(qtf)){
    const idf = idx.idf[t]; if (!idf) continue;
    qvec[t] = f * idf;
  }

  const scored: {score:number; text:string; title:string; path:string}[] = [];

  for (const d of idx.docs){
    for (const c of d.chunks){
      const v: Record<string, number> = {};
      for (const [t,f] of Object.entries(c.tf)){
        const idf = idx.idf[t]; if (!idf) continue;
        v[t] = f * idf;
      }
      const s = cosineSparse(qvec, v);
      if (s > 0) scored.push({ score:s, text:c.text, title:d.title, path:d.path });
    }
  }

  scored.sort((a,b)=> b.score - a.score);
  const top = scored.slice(0, k);

  const context = top.map((r,i)=>`[${i+1}] ${r.title}\n${r.text.trim().replace(/\s+/g," ").slice(0,1200)}\nSOURCE: ${r.path}`).join("\n\n");
  const citations = top.map((r,i)=>({ n:i+1, title:r.title, path:r.path, score:Number(r.score.toFixed(4)) }));

  return { context, citations };
}
