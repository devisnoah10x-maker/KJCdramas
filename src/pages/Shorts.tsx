import { useMemo, useState } from 'react';
import { shorts } from '../data/shorts';
import { countries } from '../data/taxonomy';
import { site } from '../data/site';
import { ShortCard } from '../components/cards/ShortCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Shell } from '../components/ui/Section';
import { PageHeader } from '../components/ui/PageHeader';
import { breadcrumbSchema } from '../components/ui/Breadcrumbs';
import { Seo } from '../components/seo/Seo';
import { cn } from '../utils/format';

export function Shorts() {
  const [country, setCountry] = useState('all');
  const crumbs = [{ label: 'Home', to: '/' }, { label: 'Shorts' }];

  const list = useMemo(
    () => shorts.filter((s) => country === 'all' || s.country === country),
    [country]
  );

  const chip = (active: boolean) =>
  cn(
    'inline-flex h-9 items-center rounded-full border px-3.5 text-sm font-medium transition-colors duration-150 ease-premium',
    active ?
    'border-brand-red bg-brand-red text-white' :
    'border-line text-mist-bright hover:border-line-bright hover:text-white'
  );

  return (
    <Shell>
      <Seo
        title="KJCDramas Shorts — Drama Clips, GIFs & Moments"
        description="Short drama clips and GIFs from Korean, Japanese and Chinese series. Every clip links back to the full drama page."
        canonical={`${site.url}/shorts/`}
        schema={breadcrumbSchema(crumbs)} />
      
      <PageHeader
        title="Shorts"
        crumbs={crumbs}
        intro="The scenes people keep reposting. Every clip is credited and links straight to the drama it came from — no sound until you ask for it.">
        
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" onClick={() => setCountry('all')} className={chip(country === 'all')}>
            All
          </button>
          {countries.map((c) =>
          <button
            key={c.id}
            type="button"
            onClick={() => setCountry(c.id)}
            className={chip(country === c.id)}>
            
              {c.label}
            </button>
          )}
        </div>
      </PageHeader>

      <div className="py-8 pb-16">
        {list.length > 0 ?
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {list.map((short) =>
          <ShortCard key={short.id} short={short} />
          )}
          </div> :

        <EmptyState
          title="No clips here yet."
          description="Try another country — we add new shorts several times a week." />

        }
      </div>
    </Shell>);

}