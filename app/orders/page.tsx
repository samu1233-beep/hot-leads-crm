import { prisma } from '@/lib/prisma';
import { LayoutShell } from '@/components/layout-shell';

export default async function OrdersPage() {
  const orders = await prisma.orderItem.findMany({ orderBy: [{ amount: 'desc' }, { company: 'asc' }] });
  const total = orders.reduce((sum, item) => sum + item.amount, 0);

  return (
    <LayoutShell title="Tilaukset" subtitle="Tilauskanta ja yhteenlaskettu arvo samassa näkymässä.">
      <div className="grid grid-3" style={{ marginBottom: 16 }}>
        <div className="card"><div className="stat">Tilauksia</div><div className="stat-value">{orders.length}</div></div>
        <div className="card"><div className="stat">Yhteisarvo</div><div className="stat-value">{total.toFixed(2)} EUR</div></div>
        <div className="card"><div className="stat">Suurin tilaus</div><div className="stat-value" style={{ fontSize: 22 }}>{orders[0]?.company ?? '-'}</div></div>
      </div>
      <div className="card tableWrap">
        <table>
          <thead><tr><th>Firma</th><th>Arvo</th></tr></thead>
          <tbody>
            {orders.map((item) => <tr key={item.id}><td><strong>{item.company || '-'}</strong></td><td>{item.amount.toFixed(2)} EUR</td></tr>)}
          </tbody>
        </table>
      </div>
    </LayoutShell>
  );
}
