import { trendingDramas } from '../data/dramas';
import { site } from '../data/site';
import { DramaRail } from '../components/cards/DramaGrid';
import { SearchBox } from '../components/search/SearchBox';
import { ButtonLink } from '../components/ui/Button';
import { Section, Shell } from '../components/ui/Section';
import { Seo } from '../components/seo/Seo';

export function NotFound() {
  return (
    <Shell>
      <Seo
        title="Page not found"
        description="This page could not be found on KJCDramas. Search for a drama or head back to the homepage."
        canonical={`${site.url}/404`}
        noindex />
      
      <div className="mx-auto max-w-xl py-20 text-center">
        <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-brand-red">404</p>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-white md:text-4xl">
          Oops… this story disappeared.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-mist md:text-base">
          The page you were looking for has moved or never existed. Try a search, or start from the top.
        </p>
        <div className="mt-7">
          <SearchBox placeholder="Search a drama, actor or genre…" />
        </div>
        <div className="mt-5 flex justify-center gap-3">
          <ButtonLink to="/">Back to KJCDramas</ButtonLink>
          <ButtonLink to="/trending" variant="secondary">
            See what's trending
          </ButtonLink>
        </div>
      </div>

      <Section title="Popular right now" kicker="Keep exploring" href="/trending" className="pb-16">
        <DramaRail dramas={trendingDramas} />
      </Section>
    </Shell>);

}