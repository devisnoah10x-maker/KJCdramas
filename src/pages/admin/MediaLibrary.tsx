import { useMemo, useState } from 'react';
import { AlertTriangleIcon, CheckIcon, CopyIcon, Trash2Icon, UploadIcon } from 'lucide-react';
import { backdrops, brand, posters } from '../../data/media';
import { AdminPageHeader, Panel, Toolbar, inputClass } from '../../components/admin/AdminUI';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { cn } from '../../utils/format';

interface Asset {
  id: string;
  name: string;
  url: string;
  category: 'Posters' | 'Backdrops' | 'Thumbnails' | 'GIFs' | 'Short Videos' | 'Logos' | 'Banners';
  width: number;
  height: number;
  sizeKb: number;
}

const assets: Asset[] = [
...posters.map((url, i) => ({
  id: `p${i}`,
  name: `poster-drama-${i + 1}.webp`,
  url,
  category: 'Posters' as const,
  width: 800,
  height: 1200,
  sizeKb: 140 + i * 18
})),
...backdrops.map((url, i) => ({
  id: `b${i}`,
  name: `backdrop-scene-${i + 1}.webp`,
  url,
  category: 'Backdrops' as const,
  width: 1920,
  height: 1080,
  sizeKb: 320 + i * 210
})),
{
  id: 'l1',
  name: 'kjcdramas-logo-horizontal.webp',
  url: brand.logo,
  category: 'Logos',
  width: 1600,
  height: 400,
  sizeKb: 42
},
{
  id: 'bn1',
  name: 'kjcdramas-hero-banner.webp',
  url: brand.heroBanner,
  category: 'Banners',
  width: 2100,
  height: 900,
  sizeKb: 680
}];


const categories = ['All', 'Posters', 'Backdrops', 'Thumbnails', 'GIFs', 'Short Videos', 'Logos', 'Banners'];

export function MediaLibrary() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Asset | null>(null);
  const [copied, setCopied] = useState(false);

  const list = useMemo(
    () =>
    assets.filter(
      (a) =>
      (category === 'All' || a.category === category) &&
      a.name.toLowerCase().includes(query.toLowerCase())
    ),
    [category, query]
  );

  return (
    <>
      <AdminPageHeader
        title="Media Library"
        description="Every image and clip on the site. Filenames are used in image URLs, so keep them descriptive."
        actions={
        <Button size="sm">
            <UploadIcon className="h-4 w-4" aria-hidden="true" />
            Upload media
          </Button>
        } />
      

      <Toolbar>
        <div className="min-w-[14rem] flex-1">
          <label htmlFor="media-search" className="sr-only">
            Search media
          </label>
          <input
            id="media-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search filenames…"
            className={inputClass} />
          
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) =>
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              'inline-flex h-9 items-center rounded-full border px-3 text-sm transition-colors duration-150 ease-premium',
              category === c ?
              'border-brand-red bg-brand-red text-white' :
              'border-line text-mist-bright hover:text-white'
            )}>
            
              {c}
            </button>
          )}
        </div>
      </Toolbar>

      <div className="grid gap-5 xl:grid-cols-[1fr_20rem]">
        {list.length === 0 ?
        <EmptyState title="No media found." description="Try another category or upload a new file." /> :

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {list.map((asset) =>
          <li key={asset.id}>
                <button
              type="button"
              onClick={() => {
                setSelected(asset);
                setCopied(false);
              }}
              aria-pressed={selected?.id === asset.id}
              className={cn(
                'w-full overflow-hidden rounded-card border text-left transition-colors duration-150 ease-premium',
                selected?.id === asset.id ?
                'border-brand-blue' :
                'border-line-soft hover:border-line-bright'
              )}>
              
                  <img
                src={asset.url}
                alt={asset.name}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full bg-ink-950 object-cover" />
              
                  <span className="block truncate px-3 pt-2 text-xs font-medium text-white">
                    {asset.name}
                  </span>
                  <span className="flex items-center gap-1.5 px-3 pb-2 pt-0.5 text-[11px] text-mist-dim">
                    {asset.width}×{asset.height} · {asset.sizeKb} KB
                    {asset.sizeKb > 400 &&
                <AlertTriangleIcon className="h-3 w-3 text-amber-400" aria-label="Large file" />
                }
                  </span>
                </button>
              </li>
          )}
          </ul>
        }

        <aside>
          {selected ?
          <Panel title="Asset details">
              <img
              src={selected.url}
              alt={selected.name}
              className="mb-4 w-full rounded-lg border border-line-soft object-cover" />
            
              <dl className="space-y-2 text-sm">
                {[
              ['Filename', selected.name],
              ['Category', selected.category],
              ['Dimensions', `${selected.width} × ${selected.height}`],
              ['File size', `${selected.sizeKb} KB`]].
              map(([k, v]) =>
              <div key={k} className="flex justify-between gap-3">
                    <dt className="text-mist-dim">{k}</dt>
                    <dd className="truncate text-white">{v}</dd>
                  </div>
              )}
              </dl>

              {selected.sizeKb > 400 &&
            <p className="mt-4 flex gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">
                  <AlertTriangleIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  This file is large and will slow down pages that use it. Compress it or use a smaller
                  variant.
                </p>
            }

              <div className="mt-4 space-y-2">
                <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(selected.url);
                    setCopied(true);
                  } catch {
                    setCopied(false);
                  }
                }}>
                
                  {copied ?
                <>
                      <CheckIcon className="h-4 w-4 text-brand-blue" aria-hidden="true" /> Copied
                    </> :

                <>
                      <CopyIcon className="h-4 w-4" aria-hidden="true" /> Copy URL
                    </>
                }
                </Button>
                <Button variant="secondary" size="sm" className="w-full">
                  Replace image
                </Button>
                <Button variant="ghost" size="sm" className="w-full text-brand-red">
                  <Trash2Icon className="h-4 w-4" aria-hidden="true" /> Delete
                </Button>
              </div>
            </Panel> :

          <Panel title="Asset details">
              <p className="text-sm text-mist">Select a file to preview it, copy its URL or replace it.</p>
            </Panel>
          }
        </aside>
      </div>
    </>);

}