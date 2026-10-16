import { useEffect } from 'react';
import { site } from '../../data/site';

interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'video.other';
  noindex?: boolean;
  /** JSON-LD structured data. Only pass data that is genuinely true of the page. */
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Document-head manager. In the production Astro build these values are
 * rendered server-side into static HTML; this component keeps the same
 * contract so page components stay unchanged.
 */
export function Seo({
  title,
  description,
  canonical,
  image = site.defaultOgImage,
  type = 'website',
  noindex = false,
  schema
}: SeoProps) {
  const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
  const url = canonical ?? site.url;

  useEffect(() => {
    document.title = fullTitle;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', image);
    upsertMeta('property', 'og:site_name', site.name);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:site', site.twitter);
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', image);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = url;
  }, [fullTitle, description, url, image, type, noindex]);

  useEffect(() => {
    if (!schema) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [schema]);

  return null;
}