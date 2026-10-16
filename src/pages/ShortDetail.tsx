import { Link, useParams } from 'react-router-dom';
import { EyeIcon, PlayIcon } from 'lucide-react';
import { shortBySlug, shorts } from '../data/shorts';
import { dramaBySlug } from '../data/dramas';
import { countryById } from '../data/taxonomy';
import { site } from '../data/site';
import { ShortCard } from '../components/cards/ShortCard';
import { ShareRow } from '../components/social/ShareRow';
import { ButtonLink } from '../components/ui/Button';
import { Section, Shell } from '../components/ui/Section';
import { Breadcrumbs, breadcrumbSchema } from '../components/ui/Breadcrumbs';
import { Seo } from '../components/seo/Seo';
import { compactNumber, formatDate } from '../utils/format';
import { NotFound } from './NotFound';

export function ShortDetail() {
  const { slug = '' } = useParams();
  const short = shortBySlug(slug);
  if (!short) return <NotFound />;

  const drama = dramaBySlug(short.relatedDrama);
  const country = countryById(short.country);
  const crumbs = [
    { label: 'Home', to: '/' },
    { label: 'Shorts', to: '/shorts' },
    { label: short.title }];

  const more = shorts.filter((s) => s.id !== short.id).slice(0, 6);

  return (
    <Shell>
      <Seo
        title={`${short.title} — ${drama?.title ?? 'Drama clip'}`}
        description={short.description}
        canonical={`${site.url}/short/${short.slug}/`}
        image={short.thumbnail}
        type="video.other"
        schema={breadcrumbSchema(crumbs)} />

      <Breadcrumbs crumbs={crumbs} />

      <div className="grid gap-8 py-4 lg:grid-cols-[minmax(0,26rem)_1fr]">
        <div className="mx-auto w-full max-w-sm">
          <div className="relative aspect-[9/16] overflow-hidden rounded-card border border-line bg-ink-900">
            <img
              src={short.mediaUrl}
              alt={`${short.title} — still from ${drama?.title ?? 'the drama'}`}
              width={720}
              height={1280}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />

            <button
              type="button"
              aria-label={`Play clip: ${short.title}`}
              className="absolute inset-0 flex items-center justify-center bg-ink-950/30 transition-colors duration-200 ease-premium hover:bg-ink-950/50">

              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-red">
                <PlayIcon className="h-6 w-6 fill-white text-white" aria-hidden="true" />
              </span>
            </button>
            <span className="pointer-events-none absolute bottom-3 right-3 rounded bg-ink-950/85 px-2 py-1 text-xs font-semibold text-white">
              {short.duration} · muted
            </span>
          </div>
        </div>

        <div>
          <h1 className="font-display text-2xl font-extrabold leading-tight text-white md:text-3xl">
            {short.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-mist">
            <span>{country?.label}</span>
            <span aria-hidden="true">·</span>
            <span>{short.genre}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <EyeIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {compactNumber(short.views)} views
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={short.createdAt}>{formatDate(short.createdAt)}</time>
          </div>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-mist-bright md:text-base">
            {short.description}
          </p>

          {drama &&
            <div className="mt-6 flex items-center gap-4 rounded-card border border-line-soft bg-ink-900 p-4">
              <img
                src={drama.poster}
                alt=""
                aria-hidden="true"
                width={80}
                height={120}
                loading="lazy"
                decoding="async"
                className="h-24 w-16 shrink-0 rounded-md object-cover"
              />

              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wider text-mist-dim">From the drama</p>
                <h2 className="mt-0.5 truncate font-display text-lg font-bold text-white">
                  <Link to={`/drama/${drama.slug}`} className="hover:text-brand-blush">
                    {drama.title}
                  </Link>
                </h2>
                <p className="mt-0.5 truncate text-xs text-mist">
                  {countryById(drama.country)?.label} · {drama.year} · {drama.genres.join(' · ')}
                </p>
                <ButtonLink to={`/drama/${drama.slug}`} size="sm" className="mt-3">
                  View full drama
                </ButtonLink>
              </div>
            </div>
          }

          <div className="mt-6">
            <ShareRow title={short.title} path={`/short/${short.slug}/`} />
          </div>
        </div>
      </div>

      <Section title="More Shorts" kicker="Keep scrolling" href="/shorts" className="pb-16">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {more.map((s) =>
            <ShortCard key={s.id} short={s} />
          )}
        </div>
      </Section>
    </Shell>);

}