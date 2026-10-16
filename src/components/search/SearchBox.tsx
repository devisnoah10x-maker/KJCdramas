import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchIcon, XIcon } from 'lucide-react';
import { publishedDramas } from '../../data/dramas';
import { countryById } from '../../data/taxonomy';
import { sanitizeText } from '../../utils/format';

interface SearchBoxProps {
  autoFocus?: boolean;
  defaultValue?: string;
  onSubmitted?: () => void;
  placeholder?: string;
  showSuggestions?: boolean;
}

export function SearchBox({
  autoFocus = false,
  defaultValue = '',
  onSubmitted,
  placeholder = 'Search dramas, actors, genres…',
  showSuggestions = true
}: SearchBoxProps) {
  const [value, setValue] = useState(defaultValue);

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  const suggestions = useMemo(() => {
    const q = value.trim().toLowerCase();

    if (q.length < 2) {
      return [];
    }

    return publishedDramas
      .filter(
        (drama) =>
          drama.title.toLowerCase().includes(q) ||
          drama.alternativeTitle.toLowerCase().includes(q) ||
          drama.cast.some((castMember) =>
            castMember.name.toLowerCase().includes(q)
          )
      )
      .slice(0, 5);
  }, [value]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const clean = sanitizeText(value.trim(), 80);

    if (!clean) {
      return;
    }

    navigate(`/search?q=${encodeURIComponent(clean)}`);
    onSubmitted?.();
  };

  return (
    <div className="relative">
      <form
        role="search"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="site-search"
          className="sr-only"
        >
          Search KJCDramas
        </label>

        <SearchIcon
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mist"
          aria-hidden="true"
        />

        <input
          id="site-search"
          ref={inputRef}
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          maxLength={80}
          className="h-12 w-full rounded-lg border border-line bg-ink-900 pl-10 pr-10 text-sm text-white placeholder:text-mist-dim focus:border-brand-blue focus:outline-none"
        />

        {value && (
          <button
            type="button"
            onClick={() => setValue('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-mist transition-colors duration-150 ease-premium hover:text-white"
            aria-label="Clear search"
          >
            <XIcon
              className="h-4 w-4"
              aria-hidden="true"
            />
          </button>
        )}
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute inset-x-0 top-full z-10 mt-2 overflow-hidden rounded-lg border border-line bg-ink-900 shadow-2xl shadow-black/60">
          {suggestions.map((drama) => (
            <li key={drama.id}>
              <Link
                to={`/drama/${drama.slug}`}
                onClick={onSubmitted}
                className="flex items-center gap-3 px-3 py-2.5 transition-colors duration-150 ease-premium hover:bg-ink-800"
              >
                <img
                  src={drama.poster}
                  alt=""
                  aria-hidden="true"
                  width={40}
                  height={60}
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-8 rounded object-cover"
                />

                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-white">
                    {drama.title}
                  </span>

                  <span className="block text-xs text-mist-dim">
                    {countryById(drama.country)?.label} · {drama.year}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}