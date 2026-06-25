import { badgeClass } from '@/lib/heat';
export function HeatBadge({ heat }: { heat: number }) {
  return <span className={badgeClass(heat)}>{heat}</span>;
}
