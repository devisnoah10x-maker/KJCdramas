import { Link } from 'react-router-dom';
import { StarIcon } from 'lucide-react';
import type { Drama } from '../../types/content';
import { countryById } from '../../data/taxonomy';
import { cn, isRecent } from '../../utils/format';
import { Badge } from '../ui/Badge';

interface DramaCardProps {
  drama: Drama;
  priority?: boolean;
  className?: string;
  showMeta?: boolean;
}

export function DramaCard({ drama, priority = false, className, showMeta = true }: DramaCardProps) {
  const country = countryById(drama.country);
  const isNew = isRecent(drama.createdAt, 45);
  const isUpdated = !isNew && isRecent(drama.updatedAt, 21);

  return (
    <article className={cn('group', className)}>
      <Link
        to={`/drama/${drama.slug}`}
        className="block rounded-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
        aria-label={`${drama.title} (${drama.year}) — ${country?.label} ${drama.type}`}>
        
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-card border border-line-soft bg-ink-850">
          <img
            src={drama.poster}
            alt={`${drama.title} poster`}
            width={400}
            height={600}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-300 ease-premium group-hover:scale-[1.025]" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />

          <div className="absolute left-2 top-2 flex flex-wrap gap-1">
            {drama.trending && <Badge tone="red">Trending</Badge>}
            {isNew && <Badge tone="blue">New</Badge>}
            {isUpdated && <Badge tone="neutral">Updated</Badge>}
          </div>

          {drama.rating > 0 &&
          <div className="absolute right-2 top-2 flex items-center gap-1 rounded bg-ink-950/80 px-1.5 py-0.5 backdrop-blur-sm">
              <StarIcon className="h-3 w-3 fill-brand-blush text-brand-blush" aria-hidden="true" />
              <span className="text-[11px] font-semibold text-white">{drama.rating.toFixed(1)}</span>
            </div>
          }

          <div className="absolute inset-x-0 bottom-0 p-2.5">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-mist-bright">
              <span className="text-white">{country?.label}</span>
              <span aria-hidden="true">·</span>
              <span>{drama.year}</span>
              {drama.status === 'Ongoing' &&
              <>
                  <span aria-hidden="true">·</span>
                  <span className="text-brand-blue">Ongoing</span>
                </>
              }
            </div>
          </div>
        </div>

        <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug text-white transition-colors duration-150 ease-premium group-hover:text-brand-blush md:text-[15px]">
          {drama.title}
        </h3>
      </Link>
      {showMeta &&
      <p className="mt-0.5 line-clamp-1 text-xs text-mist-dim">{drama.genres.join(' · ')}</p>
      }
    </article>);

}