import { Link } from 'react-router-dom';
import { latestArticles } from '../data/articles';
import { byCountry, latestDramas, mostViewed, trendingDramas } from '../data/dramas';
import { shorts } from '../data/shorts';
import { countries, genres } from '../data/taxonomy';
import { site } from '../data/site';
import { AdSlot } from '../components/ads/AdSlot';
import { ArticleCard } from '../components/cards/ArticleCard';
import { DramaGrid, DramaRail } from '../components/cards/DramaGrid';
import { GenreCard } from '../components/cards/GenreCard';
import { ShortsRail } from '../components/cards/ShortCard';
import { Hero } from '../components/home/Hero';
import { NewsletterCTA, SocialCTA } from '../components/home/GrowthCTA';
import { Section, Shell } from '../components/ui/Section';
import { Seo } from '../components/seo/Seo';

export function Home() {
  return (
    <>
      <Seo
        title="KJCDramas — Korean, Japanese & Chinese Dramas, Movies and Moments"
        description={site.description}
        canonical={`${site.url}/`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: site.name,
          url: site.url,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${site.url}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
          }
        }} />


      <Hero />

      <Shell>

        <Section
          title="Trending Now"
          kicker="What everyone is watching"
          href="/trending"
          className="pt-4">

          <DramaRail dramas={trendingDramas} />
        </Section>

        {countries.map((country, index) => {
          const list = byCountry(country.id).slice(0, 8);
          return (
            <Section
              key={country.id}
              title={`${country.name} Dramas`}
              kicker={country.flag}
              description={country.description}
              href={`/${country.slug}`}
              hrefLabel={`All ${country.label}`}
              className={index === 0 ? 'pt-2' : undefined}>

              <DramaRail dramas={list} />
            </Section>);

        })}

        <Section
          title="KJCDramas Shorts"
          kicker="Moments worth 10 seconds"
          description="The scenes people keep reposting — clipped, credited and linked straight back to the full drama."
          href="/shorts">

          <ShortsRail shorts={shorts.slice(0, 8)} />
        </Section>

        <div className="py-2">
          <AdSlot id="home-native-mid" />
        </div>

        <Section title="Popular Genres" kicker="Browse by mood" href="/genres">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {genres.slice(0, 12).map((genre) =>
              <GenreCard key={genre.id} genre={genre} />
            )}
          </div>
        </Section>

        <Section
          title="Latest Additions"
          kicker="Recently updated"
          href="/latest"
          description="Newly added titles and pages we refreshed with new episodes, cast or clips this month.">

          <DramaGrid dramas={latestDramas.slice(0, 12)} priorityCount={0} />
        </Section>

        <Section
          title="Editor's Picks"
          kicker="Hand-picked for you"
          description="A hand-picked selection of dramas our editors think are worth watching. Updated regularly.">
          <DramaRail dramas={mostViewed.slice(0, 8)} />
        </Section>

        <Section title="Latest Articles" kicker="Read while you decide" href="/blog">
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ArticleCard article={latestArticles[0]} variant="feature" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {latestArticles.slice(1, 3).map((article) =>
                <ArticleCard key={article.id} article={article} />
              )}
            </div>
          </div>
        </Section>

        <div className="grid gap-5 pb-16 lg:grid-cols-2">
          <SocialCTA />
          <NewsletterCTA />
        </div>

        <nav aria-label="Popular searches" className="border-t border-line-soft py-8">
          <h2 className="mb-3 text-sm font-semibold text-white">Popular right now</h2>
          <ul className="flex flex-wrap gap-2">
            {[
              { label: 'Korean romance dramas', to: '/genres/romance' },
              { label: 'Chinese historical dramas', to: '/genres/historical' },
              { label: 'Japanese mystery dramas', to: '/genres/mystery' },
              { label: 'Ongoing K-dramas 2026', to: '/korean-dramas' },
              { label: 'Wuxia and xianxia', to: '/genres/fantasy' },
              { label: 'Short drama clips', to: '/shorts' },
              { label: 'Asian movies', to: '/movies' }].
              map((tag) =>
                <li key={tag.to + tag.label}>
                  <Link
                    to={tag.to}
                    className="inline-flex rounded-full border border-line px-3 py-1.5 text-xs text-mist transition-colors duration-150 ease-premium hover:border-line-bright hover:text-white">

                    {tag.label}
                  </Link>
                </li>
              )}
          </ul>
        </nav>
      </Shell>
    </>);

}