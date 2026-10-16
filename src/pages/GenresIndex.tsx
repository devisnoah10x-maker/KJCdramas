import { genres } from '../data/taxonomy';
import { site } from '../data/site';
import { GenreCard } from '../components/cards/GenreCard';
import { Shell } from '../components/ui/Section';
import { PageHeader } from '../components/ui/PageHeader';
import { breadcrumbSchema } from '../components/ui/Breadcrumbs';
import { Seo } from '../components/seo/Seo';

export function GenresIndex() {
  const crumbs = [{ label: 'Home', to: '/' }, { label: 'Genres' }];

  return (
    <Shell>
      <Seo
        title="Browse Asian Dramas by Genre"
        description="Romance, thriller, historical, fantasy, comedy and more. Browse Korean, Japanese and Chinese dramas by genre on KJCDramas."
        canonical={`${site.url}/genres/`}
        schema={breadcrumbSchema(crumbs)} />
      
      <PageHeader
        title="Genres"
        crumbs={crumbs}
        intro="Pick a mood. Every genre page collects Korean, Japanese and Chinese titles side by side, so you can compare how each country handles it." />
      
      <div className="grid grid-cols-2 gap-3 py-8 pb-16 sm:grid-cols-3 lg:grid-cols-4">
        {genres.map((genre) =>
        <GenreCard key={genre.id} genre={genre} />
        )}
      </div>
    </Shell>);

}