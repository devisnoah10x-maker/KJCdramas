import { Link } from 'react-router-dom';
import type { Country, Genre } from '../../types/content';

export function GenreCard({ genre }: { genre: Genre }) {
  return (
    <Link
      to={`/genres/${genre.slug}`}
      className="group relative flex h-24 items-end overflow-hidden rounded-card border border-line-soft bg-ink-850 p-3 transition-colors duration-200 ease-premium hover:border-line-bright md:h-28"
    >
      <img
        src={genre.image}
        alt=""
        aria-hidden="true"
        width={800}
        height={450}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-30 transition-transform duration-300 ease-premium group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/70 to-ink-950/20" />

      <div className="relative">
        <h3 className="font-display text-base font-bold text-white md:text-lg">
          {genre.name}
        </h3>

        <p className="text-xs text-mist">
          {genre.count} titles
        </p>
      </div>
    </Link>
  );
}

export function CountryCard({ country }: { country: Country }) {
  return (
    <Link
      to={`/${country.slug}`}
      className="group relative flex min-h-[9rem] flex-col justify-end overflow-hidden rounded-card border border-line-soft bg-ink-850 p-4 transition-colors duration-200 ease-premium hover:border-line-bright md:min-h-[11rem]"
    >
      <img
        src={country.image}
        alt=""
        aria-hidden="true"
        width={800}
        height={450}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-300 ease-premium group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />

      <div className="relative">
        <p className="text-xs font-medium text-brand-blush">
          {country.flag}
        </p>

        <h3 className="font-display text-xl font-bold text-white">
          {country.label}
        </h3>

        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-mist">
          {country.description}
        </p>
      </div>
    </Link>
  );
}