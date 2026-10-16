import { movies } from '../data/dramas';
import { site } from '../data/site';
import { CollectionView } from '../components/collections/CollectionView';
import { Shell } from '../components/ui/Section';
import { PageHeader } from '../components/ui/PageHeader';
import { breadcrumbSchema } from '../components/ui/Breadcrumbs';
import { Seo } from '../components/seo/Seo';

export function Movies() {
  const crumbs = [{ label: 'Home', to: '/' }, { label: 'Movies' }];

  return (
    <Shell>
      <Seo
        title="Asian Movies — Korean, Japanese & Chinese Films"
        description="Korean, Japanese and Chinese films worth a single evening. Browse crime thrillers, romances and fantasy epics with cast, runtime and recommendations."
        canonical={`${site.url}/movies/`}
        schema={breadcrumbSchema(crumbs)} />
      
      <PageHeader
        title="Movies"
        crumbs={crumbs}
        intro="One sitting, one story. Korean, Japanese and Chinese films for the nights you don't want to commit to sixteen episodes." />
      
      <div className="pb-16 pt-2">
        <CollectionView dramas={movies} emptyTitle="No movies found." />
      </div>
    </Shell>);

}