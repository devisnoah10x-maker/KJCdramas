import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, search]);
  return null;
}

export function SiteLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-ink-950">
      <ScrollToTop />
      <Header />
      <main id="main" className="flex-1 pt-14 md:pt-[4.5rem]">
        <Outlet />
      </main>
      <Footer />
    </div>);

}