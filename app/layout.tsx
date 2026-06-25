import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hot Leads CRM V2',
  description: 'CRM joka nostaa lampimimmat liidit ylimmaksi.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fi">
      <body>{children}</body>
    </html>
  );
}
