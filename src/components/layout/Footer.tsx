import { Link } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, YoutubeIcon, MusicIcon, ImageIcon } from 'lucide-react';
import { footerNav, site, socials } from '../../data/site';
import { Logo } from '../ui/Logo';

const socialIcon: Record<string, typeof FacebookIcon> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  YouTube: YoutubeIcon,
  TikTok: MusicIcon,
  Pinterest: ImageIcon
};

export function Footer() {
  return (
    <footer className="border-t border-line-soft bg-ink-950">
      <div className="mx-auto max-w-shell px-4 py-12 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2.6fr]">
          <div>
            <Logo className="h-7" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist">
              KJCDramas — Stories That Stay With You. A discovery guide to Korean, Japanese and Chinese
              dramas, movies and the moments people can’t stop sharing.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {socials.map((s) => {
                const Icon = socialIcon[s.label] ?? ImageIcon;
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`KJCDramas on ${s.label}`}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-mist-bright transition-colors duration-150 ease-premium hover:border-brand-red hover:text-white">
                      
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>);

              })}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((group) =>
            <nav key={group.title} aria-label={group.title}>
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white">
                  {group.title}
                </h2>
                <ul className="space-y-2">
                  {group.items.map((item) =>
                <li key={item.to}>
                      <Link
                    to={item.to}
                    className="text-sm text-mist transition-colors duration-150 ease-premium hover:text-white">
                    
                        {item.label}
                      </Link>
                    </li>
                )}
                </ul>
              </nav>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line-soft pt-6 text-xs text-mist-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All trademarks and posters belong to their respective
            owners.
          </p>
          <p>
            KJCDramas is an information and discovery platform. We do not host copyrighted video content.{' '}
            <Link to="/dmca" className="text-mist-bright underline underline-offset-2 hover:text-white">
              Report an issue
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>);

}