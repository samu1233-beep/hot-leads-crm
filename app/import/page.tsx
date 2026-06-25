import { LayoutShell } from '@/components/layout-shell';
import { ImportForm } from './import-form';

export default function ImportPage() {
  return (
    <LayoutShell title="Excel-tuonti" subtitle="Korjattu V2-tuonti näyttää onnistumisen ja palaa CRM-näkymään.">
      <div className="card" style={{ maxWidth: 760 }}>
        <ImportForm />
      </div>
    </LayoutShell>
  );
}
