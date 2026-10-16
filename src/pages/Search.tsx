import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { publishedDramas } from '../data/dramas';
import { countries, genres } from '../data/taxonomy';
import { site } from '../data/site';
import { sortDramas, type SortKey } from '../components/collections/CollectionView';
import { DramaGrid } from '../components/cards/DramaGrid';
import { SearchBox } from '../components/search/SearchBox';
import { EmptyState } from '../components/ui/EmptyState';
import { ButtonLink } from '../components/ui/Button';
import { Shell } from '../components/ui/Section';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Seo } from '../components/seo/Seo';
import { cn, sanitizeText } from '../utils/format';

const years = ['all', '2026', '2025', '2024', '2023'];

export function Search() {
  const [params] = useSearchParams();
  const query = sanitizeText(params.get('q') ?? '', 80);

  const [country, setCountry] = useState('all');
  const [genre, setGenre] = useState('all');
  const [year, setYear] = useState('all');
  const [sort, setSort] = useState<SortKey>('popular');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matched = publishedDramas.filter((d) => {
      const matchesQuery =
      !q ||
      d.title.toLowerCase().includes(q) ||
      d.alternativeTitle.toLowerCase().includes(q) ||
      d.director.toLowerCase().includes(q) ||
      d.genres.some((g) => g.toLowerCase().includes(q)) ||
      d.cast.some((c) => c.name.toLowerCase().includes(q));
      return (
        matchesQuery && (
        country === 'all' || d.country === country) && (
        genre === 'all' || d.genres.some((g) => g.toLowerCase() === genre)) && (
        year === 'all' || String(d.year) === year));

    });
    return sortDramas(matched, sort);
  }, [query, country, genre, year, sort]);

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
        title={query ? `Search results for “${query}”` : 'Search dramas, actors and genres'}
        description="Search Korean, Japanese and Chinese dramas by title, actor, genre, country or year on KJCDramas."
        canonical={`${site.url}/search/`}
        noindex />
      
      <Breadcrumbs crumbs={[{ label: 'Home', to: '/' }, { label: 'Search' }]} />

      <div className="max-w-2xl pb-6 pt-2">
        <h1 className="font-display text-3xl font-extrabold text-white md:text-4xl">
          {query ? `Results for “${query}”` : 'Search'}
        </h1>
        <p className="mt-2 text-sm text-mist">Search by drama title, actor, director, genre or country.</p>
        <div className="mt-5">
          <SearchBox defaultValue={query} showSuggestions={false} />
        </div>
      </div>

      <div className="space-y-3 border-y border-line-soft py-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 w-16 text-xs font-semibold uppercase tracking-wider text-mist-dim">
            Country
          </span>
          <button type="button" onClick={() => setCountry('all')} className={chip(country === 'all')}>
            All
          </button>
          {countries.map((c) =>
          <button key={c.id} type="button" onClick={() => setCountry(c.id)} className={chip(country === c.id)}>
              {c.name}
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 w-16 text-xs font-semibold uppercase tracking-wider text-mist-dim">Genre</span>
          <button type="button" onClick={() => setGenre('all')} className={chip(genre === 'all')}>
            All
          </button>
          {genres.slice(0, 9).map((g) =>
          <button
            key={g.id}
            type="button"
            onClick={() => setGenre(g.name.toLowerCase())}
            className={chip(genre === g.name.toLowerCase())}>
            
              {g.name}
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 w-16 text-xs font-semibold uppercase tracking-wider text-mist-dim">Year</span>
            {years.map((y) =>
            <button key={y} type="button" onClick={() => setYear(y)} className={chip(year === y)}>
                {y === 'all' ? 'Any' : y}
              </button>
            )}
          </div>
          <div className="ml-auto">
            <label htmlFor="search-sort" className="sr-only">
              Sort results
            </label>
            <select
              id="search-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-9 rounded-lg border border-line bg-ink-900 px-3 text-sm text-white focus:border-brand-blue focus:outline-none">
              
              <option value="popular">Sort: Popular</option>
              <option value="newest">Sort: Newest</option>
              <option value="rating">Sort: Rating</option>
              <option value="az">Sort: A–Z</option>
            </select>
          </div>
        </div>
      </div>

      <div className="py-8 pb-16">
        <p className="mb-5 text-sm text-mist">
          <span className="font-semibold text-white">{results.length}</span> matching titles
        </p>
        {results.length > 0 ?
        <DramaGrid dramas={results} /> :

        <EmptyState
          title="No dramas found."
          description="Try another title, genre or country — or clear a filter or two."
          action={
          <ButtonLink to="/dramas" variant="secondary" size="sm">
                Browse all dramas
              </ButtonLink>
          } />

        }
      </div>
    </Shell>);

}