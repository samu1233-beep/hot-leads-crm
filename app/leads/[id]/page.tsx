import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { HeatBadge } from '@/components/heat-badge';
import { LayoutShell } from '@/components/layout-shell';
import { updateLead } from './actions';

export default async function LeadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) return notFound();

  return (
    <LayoutShell title={lead.company} subtitle="Liidin tiedot, muistiinpanot ja lampoasteen muokkaus.">
      <div className="grid grid-2">
        <div className="card">
          <div className="actions" style={{ alignItems: 'center', marginBottom: 12 }}>
            <HeatBadge heat={lead.heat} />
            <strong>{lead.priority}</strong>
            <span>{lead.status}</span>
          </div>
          <div className="kv"><div className="kvLabel">Firma</div><div>{lead.company}</div></div>
          <div className="kv"><div className="kvLabel">Yhteyshenkilo</div><div>{lead.contactName || <span className="empty">Ei kirjattu</span>}</div></div>
          <div className="kv"><div className="kvLabel">Yhteystieto</div><div>{lead.emailOrPhone || <span className="empty">Ei kirjattu</span>}</div></div>
          <div className="kv"><div className="kvLabel">Viimeisin yhteys</div><div>{lead.lastContactAt || <span className="empty">Ei kirjattu</span>}</div></div>
          <div className="kv"><div className="kvLabel">Toimenpiteet</div><div>{lead.actions || <span className="empty">Ei kirjattu</span>}</div></div>
          <div className="kv"><div className="kvLabel">Tulos / kommentti</div><div>{lead.resultComment || <span className="empty">Ei kirjattu</span>}</div></div>
          <div className="kv"><div className="kvLabel">Jatkotoimet</div><div>{lead.nextActions || <span className="empty">Ei kirjattu</span>}</div></div>
        </div>

        <div className="card">
          <form action={updateLead} className="grid" style={{ gap: 14 }}>
            <input type="hidden" name="id" value={lead.id} />
            <div>
              <label><strong>Lampo 1-10</strong></label>
              <div style={{ height: 8 }} />
              <input className="input" type="number" min="1" max="10" name="heat" defaultValue={lead.heat} required />
            </div>
            <div>
              <label><strong>Muistiinpanot</strong></label>
              <div style={{ height: 8 }} />
              <textarea className="textarea" name="notes" defaultValue={lead.notes} />
            </div>
            <div className="actions">
              <button className="button" type="submit">Tallenna</button>
              <Link href="/" className="button secondary">Takaisin</Link>
            </div>
          </form>
        </div>
      </div>
    </LayoutShell>
  );
}
