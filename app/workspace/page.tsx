import DualDock from '@/components/DualDock';
export default function Workspace() {
  return (
    <main style={{ minHeight: '100vh', padding: 24 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Workspace</h1>
      <DualDock />
    </main>
  );
}
