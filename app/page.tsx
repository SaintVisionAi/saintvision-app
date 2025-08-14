export default function Home() {
  return (
    <main style={{ minHeight: '100vh', padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>SAINTSAL</h1>
      <p style={{ opacity: 0.8, marginBottom: 16 }}>
        Dual-AI workspace is live. Open <a href="/pro" style={{ textDecoration: 'underline' }}>/pro</a> to run the console.
      </p>
      <ul style={{ lineHeight: 1.9, opacity: 0.9 }}>
        <li>Health: <a href="/api/health" style={{ textDecoration: 'underline' }}>/api/health</a></li>
        <li>Dual route: <code>/api/dual/run</code></li>
        <li>SAINTSAL published prompt: <code>/api/prompt/run</code></li>
      </ul>
    </main>
  );
}
