export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function compactNumber(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return String(value);
}

export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function relativeDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`).getTime();
  const days = Math.round((Date.now() - d) / 86_400_000);
  if (days <= 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 30) return `${days} days ago`;
  if (days < 365) return `${Math.round(days / 30)} months ago`;
  return `${Math.round(days / 365)} years ago`;
}

export function isRecent(iso: string, days = 30): boolean {
  return Date.now() - new Date(`${iso}T00:00:00`).getTime() < days * 86_400_000;
}

/** Escapes user-provided strings before they are echoed back into the UI. */
export function sanitizeText(input: string, maxLength = 200): string {
  return input.replace(/[<>]/g, '').slice(0, maxLength);
}