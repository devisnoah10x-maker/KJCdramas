import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SiteLayout } from './components/layout/SiteLayout';
import { AdminLayout } from './components/admin/AdminLayout';
import { Home } from './pages/Home';
import { Dramas } from './pages/Dramas';
import { Movies } from './pages/Movies';
import { Trending } from './pages/Trending';
import { Latest } from './pages/Latest';
import { CountryPage } from './pages/CountryPage';
import { GenresIndex } from './pages/GenresIndex';
import { GenrePage } from './pages/GenrePage';
import { DramaDetail } from './pages/DramaDetail';
import { Shorts } from './pages/Shorts';
import { ShortDetail } from './pages/ShortDetail';
import { Search } from './pages/Search';
import { Blog } from './pages/Blog';
import { ArticlePage } from './pages/ArticlePage';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { LegalPage } from './pages/Legal';
import { NotFound } from './pages/NotFound';
import { Dashboard } from './pages/admin/Dashboard';
import { DramasAdmin } from './pages/admin/DramasAdmin';
import { DramaEditor } from './pages/admin/DramaEditor';
import { ShortsAdmin } from './pages/admin/ShortsAdmin';
import { ArticlesAdmin } from './pages/admin/ArticlesAdmin';
import { MediaLibrary } from './pages/admin/MediaLibrary';
import { AdsAdmin } from './pages/admin/AdsAdmin';
import { SeoAdmin } from './pages/admin/SeoAdmin';
import { SettingsAdmin } from './pages/admin/SettingsAdmin';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dramas" element={<Dramas />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/latest" element={<Latest />} />
          <Route path="/korean-dramas" element={<CountryPage slug="korean-dramas" />} />
          <Route path="/japanese-dramas" element={<CountryPage slug="japanese-dramas" />} />
          <Route path="/chinese-dramas" element={<CountryPage slug="chinese-dramas" />} />
          <Route path="/genres" element={<GenresIndex />} />
          <Route path="/genres/:slug" element={<GenrePage />} />
          <Route path="/drama/:slug" element={<DramaDetail />} />
          <Route path="/shorts" element={<Shorts />} />
          <Route path="/short/:slug" element={<ShortDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<ArticlePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<LegalPage page="privacy" />} />
          <Route path="/terms" element={<LegalPage page="terms" />} />
          <Route path="/dmca" element={<LegalPage page="dmca" />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin is a protected area. In production these routes sit behind
               Supabase Auth session checks and are excluded from the sitemap. */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dramas" element={<DramasAdmin />} />
          <Route path="dramas/:id" element={<DramaEditor />} />
          <Route path="dramas/new" element={<DramaEditor />} />
          <Route path="shorts" element={<ShortsAdmin />} />
          <Route path="articles" element={<ArticlesAdmin />} />
          <Route path="media" element={<MediaLibrary />} />
          <Route path="ads" element={<AdsAdmin />} />
          <Route path="seo" element={<SeoAdmin />} />
          <Route path="settings" element={<SettingsAdmin />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
        </Routes>
    </BrowserRouter>);

}