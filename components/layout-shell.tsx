import Link from 'next/link';

export function LayoutShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <main className="container">
      <div className="header">
        <div>
          <div className="brandWrap">
            <div className="logoBox">
              <img src="/upek_logo.jpg" alt="Upek logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div>
              <div className="title">{title}</div>
              <div className="subtitle">{subtitle}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="nav">
        <Link href="/">CRM</Link>
        <Link href="/orders">Tilaukset</Link>
        <Link href="/excel">Koko Excel</Link>
        <Link href="/import">Excel-tuonti</Link>
      </div>
      {children}
    </main>
  );
}
