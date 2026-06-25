import Link from 'next/link';
import { HeatBadge } from './heat-badge';

export function LeadTable({ leads }: { leads: Array<{ id: string; company: string; contactName: string | null; emailOrPhone: string | null; actions: string | null; nextActions: string | null; heat: number; status: string; priority: string; notes: string; }> }) {
  return (
    <div className="card tableWrap">
      <table>
        <thead>
          <tr>
            <th>Prioriteetti</th>
            <th>Lämpö</th>
            <th>Firma</th>
            <th>Yhteystieto</th>
            <th>Status</th>
            <th>Toimenpiteet</th>
            <th>Muistiinpanot</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td><strong>{lead.priority}</strong></td>
              <td><HeatBadge heat={lead.heat} /></td>
              <td><strong>{lead.company}</strong></td>
              <td>{lead.emailOrPhone || lead.contactName || <span className="empty">Puuttuu</span>}</td>
              <td>{lead.status}</td>
              <td>{lead.actions || <span className="empty">Ei kirjattu</span>}</td>
              <td>{lead.notes || <span className="empty">Ei muistiinpanoja</span>}</td>
              <td><Link href={'/leads/' + lead.id} className="button secondary">Avaa</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
