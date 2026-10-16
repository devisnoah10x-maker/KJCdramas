import { Link } from 'react-router-dom';
import { byCountry, latestDramas } from '../data/dramas';
import { latestArticles } from '../data/articles';
import { countryBySlug, genres } from '../data/taxonomy';
import { site } from '../data/site';
import { CollectionView } from '../components/collections/CollectionView';
import { DramaRail } from '../components/cards/DramaGrid';
import { ArticleCard } from '../components/cards/ArticleCard';
import { GenreCard } from '../components/cards/GenreCard';
import { Section, Shell } from '../components/ui/Section';
import { PageHeader } from '../components/ui/PageHeader';
import { breadcrumbSchema } from '../components/ui/Breadcrumbs';
import { Seo } from '../components/seo/Seo';
import { NotFound } from './NotFound';

export function CountryPage({ slug }: {slug: string;}) {
  const country = countryBySlug(slug);
  if (!country) return <NotFound />;

  const all = byCountry(country.id);
  const trending = all.filter((d) => d.trending);
  const latest = latestDramas.filter((d) => d.country === country.id).slice(0, 8);
  const crumbs = [{ label: 'Home', to: '/' }, { label: country.label }];
  const countryGenres = genres.filter((g) =>
  all.some((d) => d.genres.some((dg) => dg.toLowerCase() === g.name.toLowerCase()))
  );
  const relatedArticles = latestArticles.
  filter((a) => a.tags.includes(country.label)).
  slice(0, 3);

  return (
    <Shell>
      <Seo
        title={`${country.name} Dramas — Watch Guide, Ratings & Recommendations`}
        description={`Browse ${country.name} dramas on KJCDramas: trending titles, latest additions, popular genres and full cast and episode details.`}
        canonical={`${site.url}/${country.slug}/`}
        image={country.image}
        schema={breadcrumbSchema(crumbs)} />
      

      <PageHeader title={`${country.name} Dramas`} crumbs={crumbs} intro={country.description}>
        <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
          <div>
            <dt className="text-xs uppercase tracking-wider text-mist-dim">Titles</dt>
            <dd className="font-display text-xl font-bold text-white">{all.length}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-mist-dim">Currently airing</dt>
            <dd className="font-display text-xl font-bold text-white">
              {all.filter((d) => d.status === 'Ongoing').length}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-mist-dim">Top genre</dt>
            <dd className="font-display text-xl font-bold text-white">
              {countryGenres[0]?.name ?? '—'}
            </dd>
          </div>
        </dl>
      </PageHeader>

      {trending.length > 0 &&
      <Section title={`Trending ${country.label}`} kicker="Popular this week">
          <DramaRail dramas={trending} />
        </Section>
      }

      {latest.length > 0 &&
      <Section title="Latest Additions" kicker="Recently updated" href="/latest">
          <DramaRail dramas={latest} />
        </Section>
      }

      <Section title={`All ${country.label}`} kicker="Full library">
        <CollectionView dramas={all} showCountryFilter={false} />
      </Section>

      <Section title="Popular Genres" kicker="Browse by mood" href="/genres">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {countryGenres.slice(0, 6).map((g) =>
          <GenreCard key={g.id} genre={g} />
          )}
        </div>
      </Section>

      {relatedArticles.length > 0 &&
      <Section title="Related Reading" kicker="From the blog" href="/blog" className="pb-16">
          <div className="grid gap-5 md:grid-cols-3">
            {relatedArticles.map((a) =>
          <ArticleCard key={a.id} article={a} />
          )}
          </div>
        </Section>
      }

      <nav aria-label="Other countries" className="border-t border-line-soft py-8 pb-16">
        <h2 className="mb-3 text-sm font-semibold text-white">Explore other countries</h2>
        <ul className="flex flex-wrap gap-2">
          {['korean-dramas', 'japanese-dramas', 'chinese-dramas'].
          filter((s) => s !== country.slug).
          map((s) =>
          <li key={s}>
                <Link
              to={`/${s}`}
              className="inline-flex rounded-full border border-line px-3.5 py-2 text-sm text-mist transition-colors duration-150 ease-premium hover:border-line-bright hover:text-white">
              
                  {countryBySlug(s)?.label}
                </Link>
              </li>
          )}
        </ul>
      </nav>
    </Shell>);

}