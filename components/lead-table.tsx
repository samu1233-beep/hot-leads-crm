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
    <LayoutShell title={lead.company} subtitle="Muokkaa liidin tietoja">
      <div className="card">
        <form action={updateLead} className="grid" style={{ gap: 14 }}>
          <input type="hidden" name="id" value={lead.id} />
          <div className="grid grid-2" style={{ gap: 14 }}>
            <div>
              <label><strong>Firma</strong></label>
              <div style={{ height: 6 }} />
              <input className="input" name="company" defaultValue={lead.company} required />
            </div>
            <div>
              <label><strong>Lämpö 1-10</strong></label>
              <div style={{ height: 6 }} />
              <input className="input" type="number" min="1" max="10" name="heat" defaultValue={lead.heat} required />
            </div>
            <div>
              <label><strong>Yhteyshenkilö</strong></label>
              <div style={{ height: 6 }} />
              <input className="input" name="contactName" defaultValue={lead.contactName || ''} />
            </div>
            <div>
              <label><strong>Sähköposti / puhelin</strong></label>
              <div style={{ height: 6 }} />
              <input className="input" name="emailOrPhone" defaultValue={lead.emailOrPhone || ''} />
            </div>
            <div>
              <label><strong>Viimeisin yhteys</strong></label>
              <div style={{ height: 6 }} />
              <input className="input" name="lastContactAt" defaultValue={lead.lastContactAt || ''} />
            </div>
            <div>
              <label><strong>Toimenpiteet</strong></label>
              <div style={{ height: 6 }} />
              <input className="input" name="actions" defaultValue={lead.actions || ''} />
            </div>
            <div>
              <label><strong>Tulos / kommentti</strong></label>
              <div style={{ height: 6 }} />
              <input className="input" name="resultComment" defaultValue={lead.resultComment || ''} />
            </div>
            <div>
              <label><strong>Jatkotoimet</strong></label>
              <div style={{ height: 6 }} />
              <input className="input" name="nextActions" defaultValue={lead.nextActions || ''} />
            </div>
          </div>
          <div>
            <label><strong>Muistiinpanot</strong></label>
            <div style={{ height: 6 }} />
            <textarea className="textarea" name="notes" defaultValue={lead.notes} />
          </div>
          <div className="actions">
            <button className="button" type="submit">Tallenna</button>
            <Link href="/" className="button secondary">Takaisin</Link>
          </div>
        </form>
      </div>
    </LayoutShell>
  );
}
