export const metadata = {
  title: 'SAINTSAL • Responsible Intelligence',
  description: 'Dual-AI workspace (Claude + OpenAI) • Pro console • API endpoints.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: '#0a0a0a', color: '#e5e5e5', fontFamily: 'ui-sans-serif, system-ui' }}>
        {children}
      </body>
    </html>
  );
}
