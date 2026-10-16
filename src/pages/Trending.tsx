import { mostViewed, trendingDramas } from '../data/dramas';
import { shorts } from '../data/shorts';
import { site } from '../data/site';
import { CollectionView } from '../components/collections/CollectionView';
import { ShortsRail } from '../components/cards/ShortCard';
import { Section, Shell } from '../components/ui/Section';
import { PageHeader } from '../components/ui/PageHeader';
import { breadcrumbSchema } from '../components/ui/Breadcrumbs';
import { Seo } from '../components/seo/Seo';

export function Trending() {
  const crumbs = [{ label: 'Home', to: '/' }, { label: 'Trending' }];
  const list = trendingDramas.length ? trendingDramas : mostViewed.slice(0, 12);

  return (
    <Shell>
      <Seo
        title="Trending Asian Dramas This Week"
        description="The Korean, Japanese and Chinese dramas people are watching, clipping and arguing about right now on KJCDramas."
        canonical={`${site.url}/trending/`}
        schema={breadcrumbSchema(crumbs)} />
      
      <PageHeader
        title="What's Trending"
        crumbs={crumbs}
        intro="Ranked by what people actually opened, shared and finished on KJCDramas over the last seven days. Updated daily." />
      
      <div className="pt-2">
        <CollectionView dramas={list} />
      </div>
      <Section title="Trending Clips" kicker="Popular this week" href="/shorts" className="pb-16">
        <ShortsRail shorts={[...shorts].sort((a, b) => b.views - a.views).slice(0, 8)} />
      </Section>
    </Shell>);

}