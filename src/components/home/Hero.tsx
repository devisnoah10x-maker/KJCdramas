import { Link } from 'react-router-dom';
import { PlayIcon, StarIcon, ArrowRightIcon } from 'lucide-react';
import { brand } from '../../data/media';
import { countries } from '../../data/taxonomy';
import { featuredDramas } from '../../data/dramas';
import { ButtonLink } from '../ui/Button';

export function Hero() {
  const spotlight = featuredDramas.slice(0, 3);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[560px] overflow-hidden sm:min-h-[600px] lg:min-h-[650px]"
    >
      {/* Hero background */}
      <img
        src={brand.heroBanner}
        alt=""
        aria-hidden="true"
        width={2100}
        height={900}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Readability overlays */}
      <div
        className="absolute inset-0 bg-ink-950/65"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-ink-950/65"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/35 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[480px] max-w-shell flex-col justify-center gap-8 px-4 pt-12 pb-7 sm:min-h-[480px] sm:px-6 sm:pt-14 sm:pb-9 lg:min-h-[520px] lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:pt-16 lg:pb-11">
        {/* Main hero content */}
        <div className="max-w-xl">
          <ul
            className="mb-5 flex flex-wrap items-center gap-2"
            aria-label="Countries covered"
          >
            {countries.map((c) => (
              <li key={c.id}>
                <Link
                  to={`/${c.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm transition-colors duration-150 ease-premium hover:border-brand-red hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
                >
                  <span className="text-mist-bright">{c.flag}</span>
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>

          <h1
            id="hero-heading"
            className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            KJCDRAMAS

            <span className="mt-2 block text-2xl font-bold text-brand-blush sm:text-3xl lg:text-4xl">
              Stories That Stay With You
            </span>
          </h1>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-mist-bright lg:text-lg">
            Discover Korean, Japanese & Chinese dramas, movies, stories and
            unforgettable moments.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <ButtonLink to="/dramas" size="lg">
              Explore Dramas
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>

            <ButtonLink to="/shorts" variant="secondary" size="lg">
              <PlayIcon className="h-4 w-4" aria-hidden="true" />
              Watch Shorts
            </ButtonLink>
          </div>
        </div>

        {/* Desktop spotlight */}
        <div className="hidden w-full max-w-md lg:block">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-mist">
            In the spotlight
          </p>

          <ul className="space-y-2">
            {spotlight.map((d) => (
              <li key={d.id}>
                <Link
                  to={`/drama/${d.slug}`}
                  className="group flex items-center gap-3 rounded-card border border-white/10 bg-ink-950/60 p-2.5 backdrop-blur-md transition-all duration-200 ease-premium hover:-translate-y-0.5 hover:border-white/25 hover:bg-ink-950/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
                >
                  <img
                    src={d.poster}
                    alt=""
                    aria-hidden="true"
                    width={80}
                    height={120}
                    loading="lazy"
                    decoding="async"
                    className="h-20 w-14 shrink-0 rounded-md object-cover"
                  />

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-white transition-colors group-hover:text-brand-blush">
                      {d.title}
                    </span>

                    <span className="mt-0.5 block truncate text-xs text-mist">
                      {d.genres.join(' · ')}
                    </span>

                    <span className="mt-1 flex items-center gap-1 text-xs text-mist-bright">
                      <StarIcon
                        className="h-3 w-3 fill-brand-blush text-brand-blush"
                        aria-hidden="true"
                      />
                      {d.rating.toFixed(1)} · {d.year}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}