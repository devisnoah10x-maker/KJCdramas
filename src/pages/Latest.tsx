import { latestDramas } from '../data/dramas';
import { site } from '../data/site';
import { CollectionView } from '../components/collections/CollectionView';
import { Shell } from '../components/ui/Section';
import { PageHeader } from '../components/ui/PageHeader';
import { breadcrumbSchema } from '../components/ui/Breadcrumbs';
import { Seo } from '../components/seo/Seo';

export function Latest() {
  const crumbs = [{ label: 'Home', to: '/' }, { label: 'Latest' }];

  return (
    <Shell>
      <Seo
        title="Latest Asian Dramas & Recently Updated Pages"
        description="Newly added Korean, Japanese and Chinese dramas plus pages updated with new episodes, cast details and clips."
        canonical={`${site.url}/latest/`}
        schema={breadcrumbSchema(crumbs)} />
      
      <PageHeader
        title="Latest Additions"
        crumbs={crumbs}
        intro="Everything new or freshly updated, newest first — new titles, new episode counts, new clips." />
      
      <div className="pb-16 pt-2">
        <CollectionView dramas={latestDramas} />
      </div>
    </Shell>);

}