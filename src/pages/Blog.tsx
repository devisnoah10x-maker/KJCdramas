import { useMemo, useState } from 'react';
import { latestArticles } from '../data/articles';
import { site } from '../data/site';
import { ArticleCard } from '../components/cards/ArticleCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Shell } from '../components/ui/Section';
import { PageHeader } from '../components/ui/PageHeader';
import { breadcrumbSchema } from '../components/ui/Breadcrumbs';
import { Seo } from '../components/seo/Seo';
import { cn } from '../utils/format';

export function Blog() {
  const [category, setCategory] = useState('All');
  const crumbs = [{ label: 'Home', to: '/' }, { label: 'Blog' }];
  const categories = ['All', ...Array.from(new Set(latestArticles.map((a) => a.category)))];

  const list = useMemo(
    () => latestArticles.filter((a) => category === 'All' || a.category === category),
    [category]
  );
  const [feature, ...rest] = list;

  return (
    <Shell>
      <Seo
        title="KJCDramas Blog — Guides, Lists & Drama Recommendations"
        description="Guides, ranked lists and essays about Korean, Japanese and Chinese dramas. Find your next watch with recommendations you can trust."
        canonical={`${site.url}/blog/`}
        schema={breadcrumbSchema(crumbs)} />
      
      <PageHeader
        title="Articles"
        crumbs={crumbs}
        intro="Recommendations, comparisons and beginner guides — written by people who actually finished the shows.">
        
        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((c) =>
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              'inline-flex h-9 items-center rounded-full border px-3.5 text-sm font-medium transition-colors duration-150 ease-premium',
              category === c ?
              'border-brand-red bg-brand-red text-white' :
              'border-line text-mist-bright hover:border-line-bright hover:text-white'
            )}>
            
              {c}
            </button>
          )}
        </div>
      </PageHeader>

      <div className="space-y-6 py-8 pb-16">
        {feature ?
        <>
            <ArticleCard article={feature} variant="feature" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((a) =>
            <ArticleCard key={a.id} article={a} />
            )}
            </div>
          </> :

        <EmptyState
          title="No articles here yet."
          description="Try another category — we publish new guides every week." />

        }
      </div>
    </Shell>);

}