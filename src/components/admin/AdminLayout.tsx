import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import {
  BarChart3Icon,
  ClapperboardIcon,
  FilmIcon,
  ImageIcon,
  LayoutDashboardIcon,
  MegaphoneIcon,
  MenuIcon,
  NewspaperIcon,
  SearchIcon,
  SettingsIcon,
  ExternalLinkIcon,
  XIcon } from
'lucide-react';
import { cn } from '../../utils/format';

const nav = [
{ to: '/admin', label: 'Dashboard', icon: LayoutDashboardIcon, end: true },
{ to: '/admin/dramas', label: 'Dramas & Movies', icon: FilmIcon },
{ to: '/admin/shorts', label: 'Shorts', icon: ClapperboardIcon },
{ to: '/admin/articles', label: 'Articles', icon: NewspaperIcon },
{ to: '/admin/media', label: 'Media Library', icon: ImageIcon },
{ to: '/admin/ads', label: 'Advertisements', icon: MegaphoneIcon },
{ to: '/admin/seo', label: 'SEO', icon: SearchIcon },
{ to: '/admin/settings', label: 'Settings', icon: SettingsIcon }];


function SidebarContent({ onNavigate }: {onNavigate?: () => void;}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2 border-b border-line-soft px-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-red text-sm font-bold text-white">
          K
        </span>
        <div className="leading-tight">
          <p className="text-sm font-bold text-white">KJCDramas</p>
          <p className="text-[11px] text-mist-dim">Content Studio</p>
        </div>
      </div>

      <nav aria-label="Admin" className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {nav.map((item) =>
          <li key={item.to}>
              <NavLink
              to={item.to}
              end={item.end}
              onClick={onNavigate}
              className={({ isActive }) =>
              cn(
                'flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors duration-150 ease-premium',
                isActive ? 'bg-ink-800 text-white' : 'text-mist hover:bg-ink-850 hover:text-white'
              )
              }>
              
                <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {item.label}
              </NavLink>
            </li>
          )}
        </ul>

        <div className="mt-6 border-t border-line-soft pt-4">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-mist-dim">Coming soon</p>
          <ul className="mt-2 space-y-1">
            {['Users', 'Comments', 'Analytics'].map((label) =>
            <li
              key={label}
              className="flex h-10 cursor-not-allowed items-center gap-3 rounded-lg px-3 text-sm text-mist-dim"
              aria-disabled="true">
              
                <BarChart3Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {label}
              </li>
            )}
          </ul>
        </div>
      </nav>

      <div className="border-t border-line-soft p-3">
        <Link
          to="/"
          className="flex h-10 items-center gap-2 rounded-lg px-3 text-sm text-mist transition-colors duration-150 ease-premium hover:bg-ink-850 hover:text-white">
          
          <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
          View live site
        </Link>
      </div>
    </div>);

}

export function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-ink-950">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-line-soft bg-ink-900 lg:block">
        <SidebarContent />
      </aside>

      {open &&
      <div className="fixed inset-0 z-50 lg:hidden">
          <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-ink-950/80" />
        
          <div className="absolute inset-y-0 left-0 w-72 border-r border-line bg-ink-900">
            <SidebarContent onNavigate={() => setOpen(false)} />
          </div>
        </div>
      }

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line-soft bg-ink-950/95 px-4 backdrop-blur-md md:px-6">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-mist-bright hover:bg-ink-850 hover:text-white lg:hidden">
            
            {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>

          <div className="relative hidden max-w-sm flex-1 md:block">
            <label htmlFor="admin-search" className="sr-only">
              Search content
            </label>
            <SearchIcon
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist"
              aria-hidden="true" />
            
            <input
              id="admin-search"
              type="search"
              placeholder="Search dramas, shorts, articles…"
              className="h-10 w-full rounded-lg border border-line bg-ink-900 pl-9 pr-3 text-sm text-white placeholder:text-mist-dim focus:border-brand-blue focus:outline-none" />
            
          </div>

          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-xs text-mist-dim sm:inline">Signed in as</span>
            <span className="flex items-center gap-2 rounded-lg border border-line px-2.5 py-1.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-blue text-[11px] font-bold text-white">
                A
              </span>
              <span className="text-sm text-white">Admin</span>
            </span>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 md:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>);

}