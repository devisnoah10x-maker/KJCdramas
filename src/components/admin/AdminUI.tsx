import type { ReactNode } from 'react';
import { cn } from '../../utils/format';
import type { PublishState } from '../../types/content';

export function AdminPageHeader({
  title,
  description,
  actions




}: {title: string;description?: string;actions?: ReactNode;}) {
  return (
    <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-sm text-mist">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </header>);

}

export function Panel({
  title,
  description,
  children,
  className





}: {title?: string;description?: string;children: ReactNode;className?: string;}) {
  return (
    <section className={cn('rounded-card border border-line-soft bg-ink-900', className)}>
      {title &&
      <div className="border-b border-line-soft px-5 py-4">
          <h2 className="text-sm font-semibold text-white">{title}</h2>
          {description && <p className="mt-1 text-xs text-mist">{description}</p>}
        </div>
      }
      <div className="p-5">{children}</div>
    </section>);

}

export function StatCard({
  label,
  value,
  delta,
  emphasis = false





}: {label: string;value: string;delta?: string;emphasis?: boolean;}) {
  return (
    <div
      className={cn(
        'rounded-card border p-5',
        emphasis ? 'border-brand-blue/40 bg-brand-blue/10' : 'border-line-soft bg-ink-900'
      )}>
      
      <p className="text-xs uppercase tracking-wider text-mist-dim">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold text-white">{value}</p>
      {delta && <p className="mt-1 text-xs text-mist">{delta}</p>}
    </div>);

}

const stateStyles: Record<PublishState, string> = {
  published: 'bg-emerald-500/15 text-emerald-300',
  draft: 'bg-ink-800 text-mist-bright',
  scheduled: 'bg-brand-blue/15 text-brand-blue'
};

export function StatePill({ state }: {state: PublishState;}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize',
        stateStyles[state]
      )}>
      
      {state}
    </span>);

}

export function Field({
  label,
  hint,
  htmlFor,
  children,
  className






}: {label: string;hint?: string;htmlFor: string;children: ReactNode;className?: string;}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-white">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-mist-dim">{hint}</p>}
    </div>);

}

export const inputClass =
'h-10 w-full rounded-lg border border-line bg-ink-950 px-3 text-sm text-white placeholder:text-mist-dim focus:border-brand-blue focus:outline-none';

export const textareaClass =
'w-full rounded-lg border border-line bg-ink-950 p-3 text-sm leading-relaxed text-white placeholder:text-mist-dim focus:border-brand-blue focus:outline-none';

export function Toolbar({ children }: {children: ReactNode;}) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2 rounded-card border border-line-soft bg-ink-900 p-3">
      {children}
    </div>);

}

export function Table({ head, children }: {head: string[];children: ReactNode;}) {
  return (
    <div className="overflow-x-auto rounded-card border border-line-soft">
      <table className="w-full min-w-[46rem] border-collapse text-left">
        <thead className="bg-ink-900">
          <tr>
            {head.map((h) =>
            <th
              key={h}
              scope="col"
              className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-mist-dim">
              
                {h}
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-line-soft bg-ink-950">{children}</tbody>
      </table>
    </div>);

}