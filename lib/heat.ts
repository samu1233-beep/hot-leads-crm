export function statusFromHeat(heat: number) {
  if (heat >= 9) return 'Kuuma';
  if (heat >= 7) return 'Lammin+';
  if (heat >= 5) return 'Lammin';
  if (heat >= 3) return 'Viilea';
  return 'Kylma';
}

export function priorityFromHeat(heat: number) {
  if (heat >= 9) return 'Soita heti';
  if (heat >= 7) return 'Kontaktoi tanaan';
  if (heat >= 5) return 'Tyosta aktiivisesti';
  if (heat >= 3) return 'Seurantaan';
  return 'Matala prioriteetti';
}

export function badgeClass(heat: number) {
  if (heat >= 9) return 'badge hot';
  if (heat >= 7) return 'badge warmplus';
  if (heat >= 5) return 'badge warm';
  if (heat >= 3) return 'badge cool';
  return 'badge cold';
}
