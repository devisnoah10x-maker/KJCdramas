import { useParams } from 'react-router-dom';
import { ClockIcon } from 'lucide-react';
import { articleBySlug, relatedArticles } from '../data/articles';
import { trendingDramas } from '../data/dramas';
import { site } from '../data/site';
import { AdSlot } from '../components/ads/AdSlot';
import { ArticleCard } from '../components/cards/ArticleCard';
import { DramaRail } from '../components/cards/DramaGrid';
import { ShareRow } from '../components/social/ShareRow';
import { Section, Shell } from '../components/ui/Section';
import { Breadcrumbs, breadcrumbSchema } from '../components/ui/Breadcrumbs';
import { Seo } from '../components/seo/Seo';
import { formatDate } from '../utils/format';
import { NotFound } from './NotFound';

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export function ArticlePage() {
  const { slug = '' } = useParams();
  const article = articleBySlug(slug);
  if (!article) return <NotFound />;

  const related = relatedArticles(article);
  const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Blog', to: '/blog' },
  { label: article.title }];


  const schema = [
  breadcrumbSchema(crumbs),
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage,
    author: { '@type': 'Person', name: article.author },
    publisher: { '@type': 'Organization', name: site.name },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: `${site.url}/blog/${article.slug}/`
  }];


  return (
    <Shell>
      <Seo
        title={article.seoTitle}
        description={article.seoDescription}
        canonical={`${site.url}/blog/${article.slug}/`}
        image={article.featuredImage}
        type="article"
        schema={schema} />
      
      <Breadcrumbs crumbs={crumbs} />

      <article className="grid gap-10 py-4 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0 max-w-3xl">
          <header>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-blue">
              {article.category}
            </p>
            <h1 className="mt-2 font-display text-3xl font-extrabold leading-tight tracking-tight text-white md:text-[2.6rem]">
              {article.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-mist-bright">{article.excerpt}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-line-soft py-3 text-xs text-mist">
              <span className="font-medium text-white">{article.author}</span>
              <span aria-hidden="true">·</span>
              <span>
                Published <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Updated <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <ClockIcon className="h-3 w-3" aria-hidden="true" />
                {article.readingTime} min read
              </span>
            </div>
          </header>

          <img
            src={article.featuredImage}
            alt={article.title}
            width={1200}
            height={675}
            loading="eager"
            decoding="async"
            className="mt-6 aspect-[16/9] w-full rounded-card border border-line-soft object-cover" />
          

          <nav
            aria-label="Table of contents"
            className="mt-8 rounded-card border border-line-soft bg-ink-900 p-5">
            
            <h2 className="text-xs font-semibold uppercase tracking-wider text-mist-dim">In this article</h2>
            <ol className="mt-3 space-y-2">
              {article.content.map((s, i) =>
              <li key={s.heading} className="flex gap-2 text-sm">
                  <span className="text-mist-dim">{i + 1}.</span>
                  <a
                  href={`#${slugify(s.heading)}`}
                  className="text-mist-bright transition-colors duration-150 ease-premium hover:text-white">
                  
                    {s.heading}
                  </a>
                </li>
              )}
            </ol>
          </nav>

          <div className="mt-8">
            {article.content.map((section, i) =>
            <section key={section.heading} className="mb-8">
                <h2
                id={slugify(section.heading)}
                className="scroll-mt-24 font-display text-xl font-bold text-white md:text-2xl">
                
                  {section.heading}
                </h2>
                {section.body.map((p, j) =>
              <p key={j} className="mt-3 text-[15px] leading-[1.75] text-mist-bright md:text-base">
                    {p}
                  </p>
              )}
                {i === 1 && <AdSlot id="article-in-content" className="mt-8" />}
              </section>
            )}
          </div>

          <ul className="flex flex-wrap gap-2 border-t border-line-soft pt-6">
            {article.tags.map((t) =>
            <li
              key={t}
              className="inline-flex rounded-full border border-line px-3 py-1 text-xs text-mist">
              
                #{t}
              </li>
            )}
          </ul>

          <div className="mt-6">
            <ShareRow title={article.title} path={`/blog/${article.slug}/`} />
          </div>
        </div>

        <aside className="space-y-8">
          <section aria-labelledby="related-articles">
            <h2 id="related-articles" className="font-display text-lg font-bold text-white">
              Related articles
            </h2>
            <div className="mt-4 space-y-4">
              {related.map((a) =>
              <ArticleCard key={a.id} article={a} variant="row" />
              )}
            </div>
          </section>
        </aside>
      </article>

      <Section title="Dramas mentioned in this guide" kicker="Related dramas" className="pb-16">
        <DramaRail dramas={trendingDramas} />
      </Section>
    </Shell>);

}