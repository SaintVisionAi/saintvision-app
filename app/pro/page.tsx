import DualDock from '@/components/DualDock';

export const metadata = {
  title: 'Pro • SAINTSAL',
  description: 'Dual-AI console wired to Claude + OpenAI and SAINTSAL prompt.',
};

export default function ProPage() {
  return (
    <main style={{ minHeight: '100vh', padding: 24 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Pro Console</h1>
      <p style={{ opacity: 0.8, marginBottom: 12 }}>
        Compare Dual (Claude + OpenAI) with your published SAINTSAL prompt runner.
      </p>
      <DualDock />
    </main>
  );
}
