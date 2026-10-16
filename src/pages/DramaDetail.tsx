import { Link, useParams } from 'react-router-dom';
import { PlayIcon, StarIcon } from 'lucide-react';
import { dramaBySlug, relatedTo } from '../data/dramas';
import { shortsForDrama, shorts as allShorts } from '../data/shorts';
import { latestArticles } from '../data/articles';
import { countryById } from '../data/taxonomy';
import { AdSlot } from '../components/ads/AdSlot';
import { DramaRail } from '../components/cards/DramaGrid';
import { ShortCard } from '../components/cards/ShortCard';
import { ArticleCard } from '../components/cards/ArticleCard';
import { ShareRow } from '../components/social/ShareRow';
import { Badge } from '../components/ui/Badge';
import { ButtonLink } from '../components/ui/Button';
import { Section, Shell } from '../components/ui/Section';
import { Breadcrumbs, breadcrumbSchema } from '../components/ui/Breadcrumbs';
import { Seo } from '../components/seo/Seo';
import { compactNumber, formatDate } from '../utils/format';
import { NotFound } from './NotFound';

export function DramaDetail() {
  const { slug = '' } = useParams();
  const drama = dramaBySlug(slug);

  if (!drama) return <NotFound />;

  const country = countryById(drama.country);
  const related = relatedTo(drama);
  const clips = shortsForDrama(drama.slug);

  const moreClips = clips.length
    ? clips
    : allShorts
        .filter((short) => short.country === drama.country)
        .slice(0, 4);

  const crumbs = [
    { label: 'Home', to: '/' },
    {
      label: country?.label ?? 'Dramas',
      to: `/${country?.slug ?? 'dramas'}`
    },
    { label: drama.title }
  ];

  const schema = [
    breadcrumbSchema(crumbs),
    {
      '@context': 'https://schema.org',
      '@type': drama.type === 'movie' ? 'Movie' : 'TVSeries',
      name: drama.title,
      alternateName: drama.alternativeTitle,
      description: drama.synopsis,
      image: drama.poster,
      datePublished: String(drama.year),
      countryOfOrigin: country?.name,
      genre: drama.genres,
      director: {
        '@type': 'Person',
        name: drama.director
      },
      actor: drama.cast.map((member) => ({
        '@type': 'Person',
        name: member.name
      })),
      ...(drama.type === 'drama'
        ? { numberOfEpisodes: drama.episodes }
        : {})
    }
  ];

  return (
    <>
      <Seo
        title={drama.seoTitle}
        description={drama.seoDescription}
        canonical={drama.canonicalUrl}
        image={drama.backdrop}
        schema={schema}
      />

      <div className="relative isolate">
        <img
          src={drama.backdrop}
          alt=""
          aria-hidden="true"
          width={1600}
          height={900}
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-[22rem] w-full object-cover md:h-[26rem]"
        />

        <div className="absolute inset-x-0 top-0 h-[22rem] bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/60 md:h-[26rem]" />

        <Shell>
          <div className="relative">
            <Breadcrumbs crumbs={crumbs} />

            <div className="grid gap-6 pb-8 pt-4 md:grid-cols-[13rem_1fr] md:gap-8 lg:grid-cols-[16rem_1fr]">
              <img
                src={drama.poster}
                alt={`${drama.title} poster`}
                width={400}
                height={600}
                loading="eager"
                decoding="async"
                className="mx-auto w-36 rounded-card border border-line object-cover shadow-2xl shadow-black/60 sm:w-40 md:mx-0 md:w-full"
              />

              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-1.5">
                  {drama.trending && (
                    <Badge tone="red">Trending</Badge>
                  )}

                  <Badge tone="outline">
                    {country?.label}
                  </Badge>

                  <Badge tone="outline">
                    {drama.status}
                  </Badge>
                </div>

                <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
                  {drama.title}
                </h1>

                <p className="mt-1.5 text-sm text-mist">
                  {drama.alternativeTitle}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-mist-bright">
                  {drama.rating > 0 && (
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-ink-850 px-2 py-1">
                      <StarIcon
                        className="h-4 w-4 fill-brand-blush text-brand-blush"
                        aria-hidden="true"
                      />

                      <span className="font-semibold text-white">
                        {drama.rating.toFixed(1)}
                      </span>

                      <span className="text-mist-dim">
                        / 10
                      </span>
                    </span>
                  )}

                  <span>{drama.year}</span>

                  <span aria-hidden="true">·</span>

                  <span>
                    {drama.type === 'movie'
                      ? drama.duration
                      : `${drama.episodes} episodes`}
                  </span>

                  <span aria-hidden="true">·</span>

                  <span>
                    {compactNumber(drama.views)} page views
                  </span>
                </div>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {drama.genres.map((genre) => (
                    <li key={genre}>
                      <Link
                        to={`/genres/${genre
                          .toLowerCase()
                          .replace(/\s+/g, '-')}`}
                        className="inline-flex rounded-full border border-line bg-ink-950/50 px-3 py-1 text-xs text-mist-bright transition-colors duration-150 ease-premium hover:border-line-bright hover:text-white"
                      >
                        {genre}
                      </Link>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-mist-bright md:text-base">
                  {drama.synopsis}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <ButtonLink
                    to={`/shorts?drama=${encodeURIComponent(
                      drama.slug
                    )}`}
                    size="lg"
                  >
                    <PlayIcon
                      className="h-4 w-4"
                      aria-hidden="true"
                    />

                    Explore short clips
                  </ButtonLink>

                  <a
                    href={drama.trailer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-line bg-ink-900/70 px-5 text-sm font-semibold text-mist-bright transition-colors duration-150 ease-premium hover:border-line-bright hover:text-white"
                  >
                    Watch official trailer
                  </a>
                </div>

                <div className="mt-5">
                  <ShareRow
                    title={drama.title}
                    path={`/drama/${drama.slug}/`}
                  />
                </div>
              </div>
            </div>
          </div>
        </Shell>
      </div>

      <Shell>
        <AdSlot
          id="drama-after-intro"
          className="py-2"
        />

        <div className="grid gap-10 py-8 lg:grid-cols-[1fr_20rem]">
          <div className="min-w-0">
            <section aria-labelledby="details-heading">
              <h2
                id="details-heading"
                className="font-display text-xl font-bold text-white"
              >
                Drama information
              </h2>

              <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 rounded-card border border-line-soft bg-ink-900 p-5 sm:grid-cols-3">
                {[
                  ['Original title', drama.alternativeTitle],
                  ['Country', country?.name ?? '—'],
                  ['Year', String(drama.year)],
                  ['Status', drama.status],
                  [
                    'Episodes',
                    drama.type === 'movie'
                      ? 'Feature film'
                      : String(drama.episodes)
                  ],
                  ['Runtime', drama.duration],
                  ['Director', drama.director],
                  ['Last updated', formatDate(drama.updatedAt)]
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs uppercase tracking-wider text-mist-dim">
                      {label}
                    </dt>

                    <dd className="mt-1 text-sm font-medium text-white">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section
              aria-labelledby="cast-heading"
              className="mt-10"
            >
              <h2
                id="cast-heading"
                className="font-display text-xl font-bold text-white"
              >
                Cast &amp; characters
              </h2>

              <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {drama.cast.map((member) => (
                  <li
                    key={member.name}
                    className="text-center"
                  >
                    <img
                      src={member.photo}
                      alt={member.name}
                      width={160}
                      height={160}
                      loading="lazy"
                      decoding="async"
                      className="mx-auto h-20 w-20 rounded-full border border-line object-cover"
                    />

                    <p className="mt-2 text-sm font-semibold text-white">
                      {member.name}
                    </p>

                    <p className="text-xs text-mist-dim">
                      {member.character}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <AdSlot
              id="drama-in-content"
              className="mt-10"
            />

            <section
              aria-labelledby="content-heading"
              className="mt-10"
            >
              <h2
                id="content-heading"
                className="font-display text-xl font-bold text-white"
              >
                Available on KJCDramas
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-mist">
                We publish clips, stills and episode notes. Full episodes are
                not hosted here — trailers and official links point to the
                rights holder.
              </p>

              <ul className="mt-4 divide-y divide-line-soft overflow-hidden rounded-card border border-line-soft bg-ink-900">
                {[
                  ['Official trailer', 'Video · external'],
                  [`${moreClips.length} short clips`, 'Clips · on site'],
                  [
                    'Episode guide',
                    drama.type === 'movie'
                      ? 'Not applicable'
                      : `${drama.episodes} entries`
                  ],
                  ['Gallery', 'Stills & posters']
                ].map(([label, meta]) => (
                  <li
                    key={label}
                    className="flex items-center justify-between px-5 py-3.5"
                  >
                    <span className="text-sm text-white">
                      {label}
                    </span>

                    <span className="text-xs text-mist-dim">
                      {meta}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {moreClips.length > 0 && (
              <Section
                title="Clips from this drama"
                kicker="Shorts"
                href="/shorts"
              >
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {moreClips.slice(0, 4).map((short) => (
                    <ShortCard
                      key={short.id}
                      short={short}
                    />
                  ))}
                </div>
              </Section>
            )}
          </div>

          <aside className="space-y-8">
            <section aria-labelledby="also-like">
              <h2
                id="also-like"
                className="font-display text-lg font-bold text-white"
              >
                You may also like
              </h2>

              <ul className="mt-4 space-y-3">
                {related.slice(0, 5).map((relatedDrama) => (
                  <li key={relatedDrama.id}>
                    <Link
                      to={`/drama/${relatedDrama.slug}`}
                      className="group flex items-center gap-3"
                    >
                      <img
                        src={relatedDrama.poster}
                        alt=""
                        aria-hidden="true"
                        width={64}
                        height={96}
                        loading="lazy"
                        decoding="async"
                        className="h-20 w-14 shrink-0 rounded-md border border-line-soft object-cover"
                      />

                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-white transition-colors duration-150 ease-premium group-hover:text-brand-blush">
                          {relatedDrama.title}
                        </span>

                        <span className="block text-xs text-mist-dim">
                          {countryById(relatedDrama.country)?.label}
                          {' · '}
                          {relatedDrama.year}
                        </span>

                        <span className="mt-1 block text-xs text-mist">
                          {relatedDrama.genres.join(' · ')}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="drama-articles">
              <h2
                id="drama-articles"
                className="font-display text-lg font-bold text-white"
              >
                Latest articles
              </h2>

              <div className="mt-4 space-y-4">
                {latestArticles.slice(0, 3).map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    variant="row"
                  />
                ))}
              </div>
            </section>
          </aside>
        </div>

        <Section
          title="Related dramas"
          kicker="Because you opened this"
          className="pb-16"
        >
          <DramaRail dramas={related} />
        </Section>
      </Shell>
    </>
  );
}