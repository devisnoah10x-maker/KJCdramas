import { site } from '../data/site';
import { countries } from '../data/taxonomy';
import { publishedDramas } from '../data/dramas';
import { shorts } from '../data/shorts';
import { publishedArticles } from '../data/articles';
import { ButtonLink } from '../components/ui/Button';
import { Shell } from '../components/ui/Section';
import { PageHeader } from '../components/ui/PageHeader';
import { breadcrumbSchema } from '../components/ui/Breadcrumbs';
import { Seo } from '../components/seo/Seo';

export function About() {
  const crumbs = [{ label: 'Home', to: '/' }, { label: 'About' }];

  return (
    <Shell>
      <Seo
        title="About KJCDramas"
        description="KJCDramas is a discovery platform for Korean, Japanese and Chinese dramas — what we publish, how we source it and what we don't host."
        canonical={`${site.url}/about/`}
        schema={breadcrumbSchema(crumbs)} />
      
      <PageHeader
        title="About KJCDramas"
        crumbs={crumbs}
        intro="We are a discovery guide for Asian drama, not a streaming service. We help people find what to watch next, and then point them to where they can watch it legally." />
      

      <div className="grid gap-10 py-10 lg:grid-cols-[1fr_20rem]">
        <div className="max-w-2xl space-y-8">
          <section>
            <h2 className="font-display text-xl font-bold text-white">What we publish</h2>
            <p className="mt-3 text-[15px] leading-[1.75] text-mist-bright">
              Drama and movie pages with cast, episode counts, genres and synopses. Short clips and stills
              credited to the production. Editorial guides and ranked lists written by people who watched the
              whole thing. Country and genre pages that make it easy to go from a mood to a title.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-white">What we don’t do</h2>
            <p className="mt-3 text-[15px] leading-[1.75] text-mist-bright">
              We do not host, stream or link to unauthorised full episodes. Trailers and official viewing
              links point to the rights holder or their licensed distributor. If you believe something on this
              site infringes your copyright, our DMCA page explains exactly how to have it removed — usually
              within 48 hours.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-white">How we pay for it</h2>
            <p className="mt-3 text-[15px] leading-[1.75] text-mist-bright">
              Advertising. Every ad unit on this site is labelled “Advertisement” and sits in its own reserved
              space, away from navigation and buttons. We do not use fake download buttons, disguised ads or
              anything designed to trick a tap. Fewer ads on mobile than desktop, on purpose.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-white">Where the ratings come from</h2>
            <p className="mt-3 text-[15px] leading-[1.75] text-mist-bright">
              Ratings shown on drama pages are our editorial score, clearly presented as such. Trending
              rankings are based on real page activity on KJCDramas over the previous seven days — not a
              personalised feed, and never a fabricated one.
            </p>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-card border border-line-soft bg-ink-900 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-mist-dim">In the library</h2>
            <dl className="mt-4 space-y-3">
              {[
              ['Dramas & movies', publishedDramas.length],
              ['Short clips', shorts.length],
              ['Articles', publishedArticles.length],
              ['Countries covered', countries.length]].
              map(([label, value]) =>
              <div key={label as string} className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-mist">{label}</dt>
                  <dd className="font-display text-lg font-bold text-white">{value}</dd>
                </div>
              )}
            </dl>
          </div>
          <div className="rounded-card border border-line-soft bg-ink-900 p-5">
            <h2 className="font-display text-base font-bold text-white">Work with us</h2>
            <p className="mt-2 text-sm leading-relaxed text-mist">
              Press, partnerships, corrections or takedowns — we answer everything.
            </p>
            <ButtonLink to="/contact" size="sm" className="mt-4">
              Contact the team
            </ButtonLink>
          </div>
        </aside>
      </div>
    </Shell>);

}