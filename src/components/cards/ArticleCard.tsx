import { Link } from 'react-router-dom';
import { ClockIcon } from 'lucide-react';
import type { Article } from '../../types/content';
import { cn, formatDate } from '../../utils/format';

export function ArticleCard({
  article,
  variant = 'default'
}: {
  article: Article;
  variant?: 'default' | 'feature' | 'row';
}) {
  if (variant === 'row') {
    return (
      <article className="group flex gap-3">
        <Link to={`/blog/${article.slug}`} className="shrink-0">
          <img
            src={article.featuredImage}
            alt=""
            aria-hidden="true"
            width={160}
            height={90}
            loading="lazy"
            decoding="async"
            className="h-16 w-24 rounded-lg border border-line-soft object-cover"
          />
        </Link>

        <div className="min-w-0">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white transition-colors duration-150 ease-premium group-hover:text-brand-blush">
            <Link to={`/blog/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          <p className="mt-1 text-xs text-mist-dim">
            {article.category} · {article.readingTime} min read
          </p>
        </div>
      </article>
    );
  }

  const feature = variant === 'feature';

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-card border border-line-soft bg-ink-900 transition-colors duration-200 ease-premium hover:border-line-bright',
        feature && 'md:flex-row'
      )}
    >
      <Link
        to={`/blog/${article.slug}`}
        className={cn(
          'block overflow-hidden',
          feature ? 'md:w-1/2' : ''
        )}
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={article.featuredImage}
          alt=""
          width={800}
          height={450}
          loading="lazy"
          decoding="async"
          className={cn(
            'w-full object-cover transition-transform duration-300 ease-premium group-hover:scale-[1.03]',
            feature ? 'h-52 md:h-full' : 'aspect-[16/9]'
          )}
        />
      </Link>

      <div
        className={cn(
          'flex flex-1 flex-col p-4 md:p-5',
          feature && 'md:justify-center md:p-7'
        )}
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-blue">
          {article.category}
        </p>

        <h3
          className={cn(
            'font-display font-bold leading-snug text-white transition-colors duration-150 ease-premium group-hover:text-brand-blush',
            feature ? 'text-xl md:text-2xl' : 'text-base'
          )}
        >
          <Link to={`/blog/${article.slug}`}>
            {article.title}
          </Link>
        </h3>

        <p
          className={cn(
            'mt-2 line-clamp-2 text-sm leading-relaxed text-mist',
            feature && 'md:line-clamp-3'
          )}
        >
          {article.excerpt}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-4 text-xs text-mist-dim">
          <span>{article.author}</span>

          <span aria-hidden="true">·</span>

          <time dateTime={article.publishedAt}>
            {formatDate(article.publishedAt)}
          </time>

          <span aria-hidden="true">·</span>

          <span className="inline-flex items-center gap-1">
            <ClockIcon
              className="h-3 w-3"
              aria-hidden="true"
            />
            {article.readingTime} min
          </span>
        </div>
      </div>
    </article>
  );
}