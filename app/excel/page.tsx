import Link from 'next/link';
import { LayoutShell } from '@/components/layout-shell';
import { workbookSheets } from '@/lib/seed-data';

export default function ExcelPage() {
  const names = Object.keys(workbookSheets);

  return (
    <LayoutShell title="Koko CRM Excel" subtitle="Kaikki löydetyt välilehdet näkyvät tässä näkymässä.">
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="actions">
          <a className="button" href="/data/source-crm.xlsx" download>Lataa alkuperäinen Excel</a>
          <Link className="button secondary" href="/">Takaisin CRM:ään</Link>
        </div>
      </div>
      {names.map((name) => {
        const rows = (workbookSheets as unknown as Record<string, Array<Array<string | number>>>)[name];
        const nonEmpty = rows.filter((r) => r.some((v) => String(v ?? '').trim() !== '')).slice(0, 40);
        return (
          <div key={name} className="card" style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>{name}</div>
            <div className="tableWrap">
              <table>
                <tbody>
                  {nonEmpty.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => <td key={j}>{String(cell || '')}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </LayoutShell>
  );
}
