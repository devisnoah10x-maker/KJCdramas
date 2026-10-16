export type CountryCode = 'kr' | 'jp' | 'cn';

export type PublishState = 'published' | 'draft' | 'scheduled';

export interface CastMember {
  name: string;
  character: string;
  photo: string;
}

export interface Drama {
  id: string;
  title: string;
  slug: string;
  alternativeTitle: string;
  country: CountryCode;
  year: number;
  status: 'Ongoing' | 'Completed' | 'Upcoming';
  type: 'drama' | 'movie';
  genres: string[];
  poster: string;
  backdrop: string;
  thumbnail: string;
  synopsis: string;
  rating: number;
  episodes: number;
  duration: string;
  cast: CastMember[];
  director: string;
  trailer: string;
  featured: boolean;
  trending: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  state: PublishState;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
}

export interface Short {
  id: string;
  title: string;
  slug: string;
  mediaUrl: string;
  thumbnail: string;
  relatedDrama: string;
  country: CountryCode;
  genre: string;
  duration: string;
  description: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  state: PublishState;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: {heading: string;body: string[];}[];
  featuredImage: string;
  category: string;
  tags: string[];
  author: string;
  readingTime: number;
  publishedAt: string;
  updatedAt: string;
  state: PublishState;
  views: number;
  seoTitle: string;
  seoDescription: string;
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  count: number;
}

export interface Country {
  id: CountryCode;
  name: string;
  label: string;
  slug: string;
  flag: string;
  description: string;
  image: string;
}