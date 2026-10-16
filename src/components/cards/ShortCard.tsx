import { Link } from 'react-router-dom';
import { PlayIcon, EyeIcon } from 'lucide-react';
import type { Short } from '../../types/content';
import { countryById } from '../../data/taxonomy';
import { cn, compactNumber } from '../../utils/format';

export function ShortCard({ short, className }: {short: Short;className?: string;}) {
  const country = countryById(short.country);

  return (
    <article className={cn('group', className)}>
      <Link to={`/short/${short.slug}`} className="block rounded-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950">
        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-card border border-line-soft bg-ink-850">
          <img
            src={short.thumbnail}
            alt={`${short.title} — clip from ${country?.name} drama`}
            width={360}
            height={640}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-300 ease-premium group-hover:scale-[1.025]" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent to-ink-950/30" />

          <span className="absolute right-2 top-2 rounded bg-ink-950/80 px-1.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
            {short.duration}
          </span>

          <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-[background-color,transform] duration-200 ease-premium group-hover:scale-105 group-hover:bg-brand-red">
            <PlayIcon className="h-4 w-4 fill-white text-white" aria-hidden="true" />
          </span>

          <div className="absolute inset-x-0 bottom-0 space-y-1 p-2.5">
            <h3 className="line-clamp-2 text-[13px] font-semibold leading-snug text-white">{short.title}</h3>
            <div className="flex items-center gap-1.5 text-[11px] text-mist">
              <span>{country?.label}</span>
              <span aria-hidden="true">·</span>
              <span>{short.genre}</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <EyeIcon className="h-3 w-3" aria-hidden="true" />
                {compactNumber(short.views)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>);

}

export function ShortsRail({ shorts }: {shorts: Short[];}) {
  return (
    <div className="no-scrollbar rail -mx-4 flex snap-x snap-mandatory gap-3.5 overflow-x-auto overscroll-x-contain scroll-smooth px-4 pb-1 sm:-mx-6 sm:gap-4 sm:px-6 lg:-mx-10 lg:px-10">
      {shorts.map((short) =>
      <ShortCard
        key={short.id}
        short={short}
        className="w-[39vw] shrink-0 snap-start sm:w-[24vw] md:w-[19vw] lg:w-[14vw] xl:w-[11.5rem]" />

      )}
    </div>);

}