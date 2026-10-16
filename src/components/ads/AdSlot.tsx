import { adSlotById, type AdSlotId } from '../../data/site';
import { cn } from '../../utils/format';

interface AdSlotProps {
  id: AdSlotId;
  className?: string;
}

function Reserved({ height, format }: {height: number;format: string;}) {
  return (
    <div
      style={{ height, minHeight: height }}
      className="flex w-full items-center justify-center rounded-lg border border-dashed border-line bg-ink-900/60">
      
      <span className="text-xs text-mist-dim">Ad space · {format}</span>
    </div>);

}

/**
 * Reserved advertising space.
 *
 * The container always reserves its configured height so injecting a creative
 * never causes layout shift. Ad network code (Adsterra) is attached at runtime
 * by the ad provider using the data-ad-slot hook below — never inlined here.
 */
export function AdSlot({ id, className }: AdSlotProps) {
  const config = adSlotById(id);
  if (!config || !config.active) return null;
  if (!config.mobile && !config.desktop) return null;

  return (
    <aside
      aria-label="Advertisement"
      data-ad-slot={config.id}
      data-ad-format={config.format}
      className={cn('w-full', !config.mobile && 'hidden md:block', !config.desktop && 'md:hidden', className)}>
      
      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-mist-dim">
        Advertisement
      </p>
      {config.mobile &&
      <div className={config.desktop ? 'md:hidden' : undefined}>
          <Reserved height={config.height.mobile} format={config.format} />
        </div>
      }
      {config.desktop &&
      <div className={config.mobile ? 'hidden md:block' : undefined}>
          <Reserved height={config.height.desktop} format={config.format} />
        </div>
      }
    </aside>);

}

export function AdBanner(props: AdSlotProps) {
  return <AdSlot {...props} />;
}

export function NativeAd(props: AdSlotProps) {
  return <AdSlot {...props} />;
}

export function MobileAd(props: AdSlotProps) {
  return <AdSlot {...props} />;
}

export function DesktopAd(props: AdSlotProps) {
  return <AdSlot {...props} />;
}

export function InContentAd({ id, className }: AdSlotProps) {
  return <AdSlot id={id} className={cn('my-8', className)} />;
}