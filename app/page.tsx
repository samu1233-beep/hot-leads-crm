import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { LeadTable } from '@/components/lead-table';
import { LayoutShell } from '@/components/layout-shell';

export default async function HomePage() {
  const leads = await prisma.lead.findMany({ orderBy: [{ heat: 'desc' }, { updatedAt: 'desc' }, { company: 'asc' }] });
  const warmCount = leads.filter((lead) => lead.heat >= 5).length;
  const hottest = leads[0];

  return (
    <LayoutShell title="Hot Leads CRM V2" subtitle="Lampojarjestys, muistiinpanot ja koko Excel samassa sovelluksessa.">
      <div className="grid grid-3" style={{ marginBottom: 16 }}>
        <div className="card"><div className="stat">Liideja yhteensa</div><div className="stat-value">{leads.length}</div></div>
        <div className="card"><div className="stat">Lampo 5-10</div><div className="stat-value">{warmCount}</div></div>
        <div className="card"><div className="stat">Kuumin liidi</div><div className="stat-value" style={{ fontSize: 22 }}>{hottest?.company ?? '-'}</div></div>
      </div>
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="actions">
          <Link href="/import" className="button">Tuo uusi Excel</Link>
          <Link href="/orders" className="button secondary">Avaa tilaukset</Link>
          <Link href="/excel" className="button secondary">Avaa koko Excel</Link>
        </div>
      </div>
      <LeadTable leads={leads} />
    </LayoutShell>
  );
}
