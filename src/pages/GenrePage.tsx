import { Link, useParams } from 'react-router-dom';
import { byGenre } from '../data/dramas';
import { genreBySlug, genres } from '../data/taxonomy';
import { site } from '../data/site';
import { CollectionView } from '../components/collections/CollectionView';
import { Shell } from '../components/ui/Section';
import { PageHeader } from '../components/ui/PageHeader';
import { breadcrumbSchema } from '../components/ui/Breadcrumbs';
import { Seo } from '../components/seo/Seo';
import { NotFound } from './NotFound';

export function GenrePage() {
  const { slug = '' } = useParams();
  const genre = genreBySlug(slug);
  if (!genre) return <NotFound />;

  const list = byGenre(genre.name);
  const crumbs = [{ label: 'Home', to: '/' }, { label: 'Genres', to: '/genres' }, { label: genre.name }];

  return (
    <Shell>
      <Seo
        title={`${genre.name} Dramas — Korean, Japanese & Chinese Picks`}
        description={`${genre.description} Browse ${genre.name.toLowerCase()} dramas from Korea, Japan and China with ratings, cast and recommendations.`}
        canonical={`${site.url}/genres/${genre.slug}/`}
        image={genre.image}
        schema={breadcrumbSchema(crumbs)} />
      
      <PageHeader title={`${genre.name} Dramas`} crumbs={crumbs} intro={genre.description} />
      <div className="pt-2">
        <CollectionView
          dramas={list}
          showGenreFilter={false}
          emptyTitle="Nothing here yet."
          emptyDescription="We're still adding titles to this genre. Try a different mood or country." />
        
      </div>

      <nav aria-label="Other genres" className="border-t border-line-soft py-8 pb-16">
        <h2 className="mb-3 text-sm font-semibold text-white">Related genres</h2>
        <ul className="flex flex-wrap gap-2">
          {genres.
          filter((g) => g.slug !== genre.slug).
          slice(0, 8).
          map((g) =>
          <li key={g.id}>
                <Link
              to={`/genres/${g.slug}`}
              className="inline-flex rounded-full border border-line px-3.5 py-2 text-sm text-mist transition-colors duration-150 ease-premium hover:border-line-bright hover:text-white">
              
                  {g.name}
                </Link>
              </li>
          )}
        </ul>
      </nav>
    </Shell>);

}