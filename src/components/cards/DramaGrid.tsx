import type { Drama } from '../../types/content';
import { cn } from '../../utils/format';
import { DramaCard } from './DramaCard';

export function DramaGrid({
  dramas,
  className,
  priorityCount = 6




}: { dramas: Drama[]; className?: string; priorityCount?: number; }) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
        className
      )}>

      {dramas.map((drama, i) =>
        <DramaCard key={drama.id} drama={drama} priority={i < priorityCount} />
      )}
    </div>);

}

/** Horizontal, snap-scrolling rail — used for homepage discovery rows. */
export function DramaRail({ dramas }: { dramas: Drama[] }) {
  return (
    <div
      className="
        no-scrollbar
        rail
        -mx-4
        flex
        snap-x
        snap-mandatory
        gap-3.5
        overflow-x-auto
        overscroll-x-contain
        scroll-smooth
        px-4
        pb-1
        sm:-mx-6
        sm:gap-4
        sm:px-6
        lg:-mx-10
        lg:px-10
      "
    >
      {dramas.map((drama, i) => (
        <DramaCard
          key={drama.id}
          drama={drama}
          priority={i < 4}
          className="
            w-[40vw]
            shrink-0
            snap-start
            sm:w-[26vw]
            md:w-[21vw]
            lg:w-[16vw]
            xl:w-[13.5rem]
          "
        />
      ))}
    </div>
  );
}