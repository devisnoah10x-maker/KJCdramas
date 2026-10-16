import { useMemo, useState } from 'react';
import { SlidersHorizontalIcon } from 'lucide-react';
import type { Drama } from '../../types/content';
import { countries, genres } from '../../data/taxonomy';
import { cn } from '../../utils/format';
import { DramaGrid } from '../cards/DramaGrid';
import { EmptyState } from '../ui/EmptyState';
import { ButtonLink } from '../ui/Button';

export type SortKey = 'popular' | 'newest' | 'rating' | 'az';

const sortOptions: {key: SortKey;label: string;}[] = [
{ key: 'popular', label: 'Popular' },
{ key: 'newest', label: 'Newest' },
{ key: 'rating', label: 'Rating' },
{ key: 'az', label: 'A–Z' }];


export function sortDramas(list: Drama[], sort: SortKey): Drama[] {
  const copy = [...list];
  switch (sort) {
    case 'newest':
      return copy.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    case 'rating':
      return copy.sort((a, b) => b.rating - a.rating);
    case 'az':
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return copy.sort((a, b) => b.views - a.views);
  }
}

interface CollectionViewProps {
  dramas: Drama[];
  showCountryFilter?: boolean;
  showGenreFilter?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}

const chip = (active: boolean) =>
cn(
  'inline-flex h-9 items-center rounded-full border px-3.5 text-sm font-medium transition-colors duration-150 ease-premium',
  active ?
  'border-brand-red bg-brand-red text-white' :
  'border-line text-mist-bright hover:border-line-bright hover:text-white'
);

export function CollectionView({
  dramas,
  showCountryFilter = true,
  showGenreFilter = true,
  emptyTitle = 'No dramas found.',
  emptyDescription = 'Try another title, genre or country.'
}: CollectionViewProps) {
  const [country, setCountry] = useState<string>('all');
  const [genre, setGenre] = useState<string>('all');
  const [sort, setSort] = useState<SortKey>('popular');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    const filtered = dramas.filter(
      (d) =>
      (country === 'all' || d.country === country) && (
      genre === 'all' || d.genres.some((g) => g.toLowerCase() === genre))
    );
    return sortDramas(filtered, sort);
  }, [dramas, country, genre, sort]);

  const availableGenres = useMemo(() => {
    const present = new Set(dramas.flatMap((d) => d.genres.map((g) => g.toLowerCase())));
    return genres.filter((g) => present.has(g.name.toLowerCase()));
  }, [dramas]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-soft pb-4">
        <p className="text-sm text-mist">
          <span className="font-semibold text-white">{results.length}</span> titles
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-line px-3 text-sm text-mist-bright transition-colors duration-150 ease-premium hover:text-white md:hidden">
            
            <SlidersHorizontalIcon className="h-4 w-4" aria-hidden="true" />
            Filters
          </button>
          <label htmlFor="sort" className="sr-only">
            Sort results
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="h-9 rounded-lg border border-line bg-ink-900 px-3 text-sm text-white focus:border-brand-blue focus:outline-none">
            
            {sortOptions.map((o) =>
            <option key={o.key} value={o.key}>
                Sort: {o.label}
              </option>
            )}
          </select>
        </div>
      </div>

      <div className={cn('space-y-3 py-4', !filtersOpen && 'hidden md:block')}>
        {showCountryFilter &&
        <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-mist-dim">Country</span>
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
        }
        {showGenreFilter &&
        <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-mist-dim">Genre</span>
            <button type="button" onClick={() => setGenre('all')} className={chip(genre === 'all')}>
              All
            </button>
            {availableGenres.map((g) =>
          <button
            key={g.id}
            type="button"
            onClick={() => setGenre(g.name.toLowerCase())}
            className={chip(genre === g.name.toLowerCase())}>
            
                {g.name}
              </button>
          )}
          </div>
        }
      </div>

      {results.length > 0 ?
      <DramaGrid dramas={results} className="pt-2" /> :

      <div className="py-6">
          <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          action={
          <ButtonLink to="/dramas" variant="secondary" size="sm">
                Browse all dramas
              </ButtonLink>
          } />
        
        </div>
      }
    </div>);

}