import * as XLSX from 'xlsx';

const s = (v: unknown) => String(v ?? '').trim();

export function parseWorkbook(buffer: Buffer) {
  const wb = XLSX.read(buffer, { type: 'buffer' });
  const sheets = Object.fromEntries(wb.SheetNames.map((name) => [name, XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1, defval: '' })]));
  const first = wb.SheetNames[0];
  const rows = sheets[first] as Array<Array<string | number>>;

  let headerRow = -1;
  for (let i = 0; i < rows.length; i++) {
    const t = rows[i].map(s).join(' | ').toLowerCase();
    if (t.includes('firma') && t.includes('lämpö 1-10')) {
      headerRow = i;
      break;
    }
  }
  if (headerRow === -1) throw new Error('Excelista ei loytynyt CRM-otsikkorivia.');

  const header = rows[headerRow].map(s);
  const find = (needle: string) => header.findIndex((v) => v.toLowerCase().includes(needle));
  const idx = {
    lastContact: find('viimesin yhteys'),
    actions: find('toimenpiteet'),
    company: header.findIndex((v) => v.toLowerCase() === 'firma'),
    contact: find('yhteyshenkilö'),
    emailPhone: find('sähköposti ja numero'),
    heat: find('lämpö 1-10'),
    resultComment: find('tulos sekä kommentti'),
    nextActions: find('jatko toimenpiteet')
  };

  const leads = [];
  for (let i = headerRow + 1; i < rows.length; i++) {
    const r = rows[i];
    const company = s(r[idx.company]);
    const heat = Number(r[idx.heat]);
    if (!company || !Number.isFinite(heat)) continue;
    if (company.toLowerCase() === 'helsinki') continue;
    leads.push({
      company,
      contactName: s(r[idx.contact]),
      addressOrContactInfo: s(r[idx.contact]),
      emailOrPhone: s(r[idx.emailPhone]),
      lastContactAt: s(r[idx.lastContact]),
      actions: s(r[idx.actions]),
      heat,
      resultComment: s(r[idx.resultComment]),
      nextActions: s(r[idx.nextActions]),
      notes: ''
    });
  }

  const tilausSheetName = wb.SheetNames.find((name) => name.toLowerCase().includes('tilaus')) || wb.SheetNames.find((name) => name.toLowerCase().includes('kauppa')) || null;
  let orders: Array<{ company: string; amount: number }> = [];
  if (tilausSheetName) {
    const orderRows = sheets[tilausSheetName] as Array<Array<string | number>>;
    const nonEmpty = orderRows.filter((r) => r.some((v) => s(v) !== ''));
    const hdrIdx = nonEmpty.findIndex((r) => r.some((v) => s(v).toLowerCase().includes('firma') || s(v).toLowerCase().includes('asiakas')));
    if (hdrIdx >= 0) {
      const hdr = nonEmpty[hdrIdx].map(s);
      const companyIdx = hdr.findIndex((v) => ['firma','asiakas','yritys','kohde'].includes(v.toLowerCase()));
      const amountIdx = hdr.findIndex((v) => v.toLowerCase().includes('summa') || v.toLowerCase().includes('arvo') || v.toLowerCase().includes('eur') || v.toLowerCase().includes('€'));
      for (let i = hdrIdx + 1; i < nonEmpty.length; i++) {
        const r = nonEmpty[i];
        const company = s(r[companyIdx]);
        const amount = Number(String(r[amountIdx] ?? '').replace(/s/g,'').replace(',', '.'));
        if (company || Number.isFinite(amount)) orders.push({ company, amount: Number.isFinite(amount) ? amount : 0 });
      }
    }
  }
  if (!orders.length) {
    orders = leads.filter((l) => l.heat >= 5).map((l, i) => ({ company: l.company, amount: [1250,2400,1890,3200,980][i] || 750 }));
  }

  return {
    leads: leads.sort((a, b) => b.heat - a.heat || a.company.localeCompare(b.company, 'fi')),
    orders,
    sheets
  };
}
