import type { ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';

export function PageHeader({
  title,
  intro,
  crumbs,
  children





}: {title: string;intro?: string;crumbs?: Crumb[];children?: ReactNode;}) {
  return (
    <header className="border-b border-line-soft pb-6 pt-2">
      {crumbs && <Breadcrumbs crumbs={crumbs} />}
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">{title}</h1>
      {intro && <p className="mt-3 max-w-3xl text-sm leading-relaxed text-mist md:text-base">{intro}</p>}
      {children}
    </header>);

}