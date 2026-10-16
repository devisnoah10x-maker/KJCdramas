import { seriesOnly } from '../data/dramas';
import { site } from '../data/site';
import { CollectionView } from '../components/collections/CollectionView';
import { Shell } from '../components/ui/Section';
import { PageHeader } from '../components/ui/PageHeader';
import { breadcrumbSchema } from '../components/ui/Breadcrumbs';
import { Seo } from '../components/seo/Seo';

export function Dramas() {
  const crumbs = [{ label: 'Home', to: '/' }, { label: 'Dramas' }];

  return (
    <Shell>
      <Seo
        title="All Asian Dramas — Korean, Japanese & Chinese Series"
        description="Browse every Korean, Japanese and Chinese drama on KJCDramas. Filter by country and genre, sort by popularity, rating or release."
        canonical={`${site.url}/dramas/`}
        schema={breadcrumbSchema(crumbs)} />
      
      <PageHeader
        title="All Dramas"
        crumbs={crumbs}
        intro="Every series in the KJCDramas library — Korean, Japanese and Chinese, ongoing and completed. Filter down to exactly what you're in the mood for." />
      
      <div className="pb-16 pt-2">
        <CollectionView dramas={seriesOnly} />
      </div>
    </Shell>);

}