import { cn } from '../../utils/format';

export function Skeleton({ className }: {className?: string;}) {
  return <div aria-hidden="true" className={cn('skeleton animate-shimmer rounded-md', className)} />;
}

export function DramaCardSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="aspect-[2/3] w-full rounded-card" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-3 w-2/5" />
    </div>);

}

export function DramaGridSkeleton({ count = 6 }: {count?: number;}) {
  return (
    <div
      role="status"
      aria-label="Loading dramas"
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
      
      {Array.from({ length: count }).map((_, i) =>
      <DramaCardSkeleton key={i} />
      )}
    </div>);

}