const fs = require("fs"), path = require("path");
const fg = require("fast-glob"); const pdfParse = require("pdf-parse");

const STOP=new Set(("a,an,the,and,or,but,if,then,else,for,of,at,by,to,from,into,onto,with,without,over,under,between,within,is,are,was,were,be,been,being,do,does,did,done,can,could,should,would,may,might,will,shall,in,on,as,that,this,these,those,it,its,you,your,me,my,we,our,they,their").split(","));
const TOKEN=/[a-z0-9]+/g;
const tok=s=>{const out=[];const lo=String(s||"").toLowerCase();let m;while(m=TOKEN.exec(lo)){const t=m[0];if(t.length<2||STOP.has(t))continue;out.push(t)}return out;}
const chunk=(t,s=1400,o=250)=>{const r=[];for(let i=0;i<t.length;i+=s-o)r.push(t.slice(i,i+s));return r}
async function read(full){const ext=path.extname(full).toLowerCase();if(ext===".pdf"){const buf=fs.readFileSync(full);const pdf=await pdfParse(buf);return pdf.text||""}return fs.readFileSync(full,"utf8")}

(async()=>{
  const ROOT=process.argv[2]||"data/knowledge"; const OUT="db/localrag.json";
  const files=await fg(["**/*.md","**/*.txt","**/*.pdf"],{cwd:ROOT}); if(!files.length){console.log(`No files in ${ROOT}`);process.exit(0)}
  const docs=[], df=new Map(); let total=0;
  for(const rel of files){
    const full=path.join(ROOT,rel), title=path.basename(full); const raw=await read(full); const parts=chunk(raw); const chunks=[];
    for(const text of parts){
      const ks=tok(text); if(!ks.length) continue;
      const tf=new Map(); for(const k of ks) tf.set(k,(tf.get(k)||0)+1);
      for(const k of new Set(ks)) df.set(k,(df.get(k)||0)+1);
      chunks.push({text, tf:Object.fromEntries(tf)}); total++;
    }
    if(chunks.length) docs.push({path:full,title,chunks});
    process.stdout.write(`Indexed: ${title} (${chunks.length})\n`);
  }
  const idf={}; for(const [t,f] of df.entries()) idf[t]=Math.log((total+1)/(f+1))+1;
  fs.writeFileSync(OUT, JSON.stringify({totalChunks:total,idf,docs}),"utf8");
  console.log(`\nWrote ${OUT} with ${total} chunks from ${docs.length} docs`);
})();
