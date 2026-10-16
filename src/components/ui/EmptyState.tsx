import type { ReactNode } from 'react';
import { SearchXIcon } from 'lucide-react';

export function EmptyState({
  title,
  description,
  action




}: {title: string;description: string;action?: ReactNode;}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-line bg-ink-900/60 px-6 py-14 text-center">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-ink-800">
        <SearchXIcon className="h-5 w-5 text-mist" aria-hidden="true" />
      </span>
      <h3 className="font-display text-lg font-bold text-white">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-mist">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>);

}