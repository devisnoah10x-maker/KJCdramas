import { useState } from 'react';
import { CheckIcon, LinkIcon, Share2Icon } from 'lucide-react';
import { site } from '../../data/site';

const networks = [
{ label: 'Facebook', url: (u: string, t: string) => `https://www.facebook.com/sharer/sharer.php?u=${u}&quote=${t}` },
{ label: 'Pinterest', url: (u: string, t: string) => `https://pinterest.com/pin/create/button/?url=${u}&description=${t}` },
{ label: 'X', url: (u: string, t: string) => `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
{ label: 'WhatsApp', url: (u: string, t: string) => `https://wa.me/?text=${t}%20${u}` }];


export function ShareRow({ title, path }: {title: string;path: string;}) {
  const [copied, setCopied] = useState(false);
  const fullUrl = `${site.url}${path}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-mist-dim">
        <Share2Icon className="h-3.5 w-3.5" aria-hidden="true" />
        Share
      </span>
      {networks.map((n) =>
      <a
        key={n.label}
        href={n.url(encodedUrl, encodedTitle)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-9 items-center rounded-lg border border-line px-3 text-sm text-mist-bright transition-colors duration-150 ease-premium hover:border-line-bright hover:text-white">
        
          {n.label}
        </a>
      )}
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(fullUrl);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
          } catch {
            setCopied(false);
          }
        }}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line px-3 text-sm text-mist-bright transition-colors duration-150 ease-premium hover:border-line-bright hover:text-white">
        
        {copied ?
        <>
            <CheckIcon className="h-3.5 w-3.5 text-brand-blue" aria-hidden="true" />
            Copied
          </> :

        <>
            <LinkIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Copy link
          </>
        }
      </button>
    </div>);

}