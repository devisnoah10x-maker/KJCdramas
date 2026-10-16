import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { MenuIcon, SearchIcon, XIcon } from 'lucide-react';
import { primaryNav } from '../../data/site';
import { cn } from '../../utils/format';
import { Logo } from '../ui/Logo';
import { SearchBox } from '../search/SearchBox';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const location = useLocation();

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();

    window.addEventListener('scroll', onScroll, {
      passive: true
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };

    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      closeButtonRef.current?.focus();
    } else {
      menuButtonRef.current?.focus();
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const openMenu = () => {
    setMenuOpen(true);
    setSearchOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen((value) => !value);
    setMenuOpen(false);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-brand-blue focus:px-3 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 border-b transition-[height,background-color,border-color] duration-200 ease-premium',
          scrolled
            ? 'h-14 border-line-soft bg-ink-950/90 backdrop-blur-xl'
            : 'h-16 border-transparent bg-ink-950/20 backdrop-blur-[2px]'
        )}
      >
        <div className="mx-auto flex h-full max-w-shell items-center gap-3 px-4 sm:px-6 lg:px-10">
          <Logo
            className={cn(
              'transition-all duration-200 ease-premium',
              scrolled ? 'h-6' : 'h-7 md:h-8'
            )}
          />

          <nav
            aria-label="Primary"
            className="ml-6 hidden lg:block"
          >
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 ease-premium focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue',
                        isActive
                          ? 'text-white'
                          : 'text-mist hover:text-white'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}

                        {isActive && (
                          <span
                            className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-red"
                            aria-hidden="true"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              onClick={toggleSearch}
              aria-expanded={searchOpen}
              aria-controls="header-search"
              aria-label={searchOpen ? 'Close search' : 'Open search'}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-mist-bright transition-colors duration-150 ease-premium hover:bg-ink-850 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              {searchOpen ? (
                <XIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              ) : (
                <SearchIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              )}
            </button>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={openMenu}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-mist-bright transition-colors duration-150 ease-premium hover:bg-ink-850 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue lg:hidden"
            >
              <MenuIcon
                className="h-5 w-5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div
            id="header-search"
            className="border-t border-line-soft bg-ink-950/97 backdrop-blur-md"
          >
            <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
              <SearchBox
                autoFocus
                onSubmitted={() => setSearchOpen(false)}
              />
            </div>
          </div>
        )}
      </header>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 lg:hidden"
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm animate-fade-up flex-col border-l border-line bg-ink-900 shadow-2xl"
          >
            <div className="flex h-16 items-center justify-between border-b border-line-soft px-4">
              <Logo className="h-6" />

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-lg text-mist-bright transition-colors duration-150 ease-premium hover:bg-ink-850 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              >
                <XIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </button>
            </div>

            <nav
              aria-label="Mobile"
              className="flex-1 overflow-y-auto p-3"
            >
              <ul className="space-y-1">
                {primaryNav.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        cn(
                          'flex h-12 items-center rounded-lg px-4 text-base font-medium transition-colors duration-150 ease-premium focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue',
                          isActive
                            ? 'bg-ink-800 text-white'
                            : 'text-mist-bright hover:bg-ink-850 hover:text-white'
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="my-3 h-px bg-line-soft" />

              <ul className="space-y-1">
                {[
                  { label: 'Latest', to: '/latest' },
                  { label: 'Blog', to: '/blog' },
                  { label: 'About', to: '/about' }
                ].map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={closeMenu}
                      className="flex h-12 items-center rounded-lg px-4 text-base text-mist transition-colors duration-150 ease-premium hover:bg-ink-850 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}