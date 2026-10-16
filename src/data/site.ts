export const site = {
  name: 'KJCDramas',
  tagline: 'Stories That Stay With You',
  description:
  'Discover Korean, Japanese & Chinese dramas, movies, stories and unforgettable moments.',
  url: 'https://kjcdramas.com',
  defaultOgImage: "/kjcdramas-default-og.jpg",

  twitter: '@kjcdramas'
};

export interface NavItem {
  label: string;
  to: string;
}

export const primaryNav: NavItem[] = [
{ label: 'Home', to: '/' },
{ label: 'K-Drama', to: '/korean-dramas' },
{ label: 'J-Drama', to: '/japanese-dramas' },
{ label: 'C-Drama', to: '/chinese-dramas' },
{ label: 'Movies', to: '/movies' },
{ label: 'Shorts', to: '/shorts' },
{ label: 'Genres', to: '/genres' },
{ label: 'Trending', to: '/trending' }];


export const footerNav: {title: string;items: NavItem[];}[] = [
{
  title: 'Discover',
  items: [
  { label: 'Home', to: '/' },
  { label: 'All Dramas', to: '/dramas' },
  { label: 'Trending', to: '/trending' },
  { label: 'Latest', to: '/latest' },
  { label: 'Shorts', to: '/shorts' }]

},
{
  title: 'Browse',
  items: [
  { label: 'K-Drama', to: '/korean-dramas' },
  { label: 'J-Drama', to: '/japanese-dramas' },
  { label: 'C-Drama', to: '/chinese-dramas' },
  { label: 'Movies', to: '/movies' },
  { label: 'Genres', to: '/genres' }]

},
{
  title: 'Read',
  items: [
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Search', to: '/search' }]

},
{
  title: 'Legal',
  items: [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Use', to: '/terms' },
  { label: 'DMCA / Copyright', to: '/dmca' }]

}];


export const socials = [
{ label: 'Facebook', href: 'https://facebook.com/kjcdramas' },
{ label: 'Instagram', href: 'https://instagram.com/kjcdramas' },
{ label: 'Pinterest', href: 'https://pinterest.com/kjcdramas' },
{ label: 'YouTube', href: 'https://youtube.com/@kjcdramas' },
{ label: 'TikTok', href: 'https://tiktok.com/@kjcdramas' }];


/**
 * Central advertisement configuration.
 * Ad network scripts (e.g. Adsterra) are injected once at runtime by the
 * ad provider — never inline in page components. Toggling a slot here
 * disables it everywhere it is used.
 */
export type AdSlotId =
'home-after-hero' |
'home-native-mid' |
'drama-after-intro' |
'drama-in-content' |
'drama-related' |
'article-in-content' |
'listing-top';

export interface AdSlotConfig {
  id: AdSlotId;
  label: string;
  active: boolean;
  desktop: boolean;
  mobile: boolean;
  format: 'banner' | 'native' | 'in-content';
  height: {mobile: number;desktop: number;};
}

export const adSlots: AdSlotConfig[] = [
{ id: 'home-after-hero', label: 'Homepage — after hero', active: true, desktop: true, mobile: true, format: 'banner', height: { mobile: 100, desktop: 90 } },
{ id: 'home-native-mid', label: 'Homepage — native mid-page', active: true, desktop: true, mobile: false, format: 'native', height: { mobile: 240, desktop: 180 } },
{ id: 'drama-after-intro', label: 'Drama page — after intro', active: true, desktop: true, mobile: true, format: 'banner', height: { mobile: 100, desktop: 90 } },
{ id: 'drama-in-content', label: 'Drama page — in content', active: true, desktop: true, mobile: false, format: 'in-content', height: { mobile: 250, desktop: 250 } },
{ id: 'drama-related', label: 'Drama page — near related', active: false, desktop: true, mobile: false, format: 'banner', height: { mobile: 100, desktop: 90 } },
{ id: 'article-in-content', label: 'Article — in content', active: true, desktop: true, mobile: true, format: 'in-content', height: { mobile: 250, desktop: 250 } },
{ id: 'listing-top', label: 'Listing pages — top', active: false, desktop: true, mobile: false, format: 'banner', height: { mobile: 100, desktop: 90 } }];


export const adSlotById = (id: AdSlotId) => adSlots.find((s) => s.id === id);