import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';
import { site } from '../../data/site';

export interface Crumb {
  label: string;
  to?: string;
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.to ? { item: `${site.url}${c.to}` } : {})
    }))
  };
}

export function Breadcrumbs({ crumbs }: {crumbs: Crumb[];}) {
  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-mist">
        {crumbs.map((crumb, i) =>
        <li key={crumb.label} className="flex items-center gap-1">
            {crumb.to ?
          <Link
            to={crumb.to}
            className="transition-colors duration-150 ease-premium hover:text-white">
            
                {crumb.label}
              </Link> :

          <span aria-current="page" className="text-mist-bright">
                {crumb.label}
              </span>
          }
            {i < crumbs.length - 1 &&
          <ChevronRightIcon className="h-3 w-3 text-mist-dim" aria-hidden="true" />
          }
          </li>
        )}
      </ol>
    </nav>);

}