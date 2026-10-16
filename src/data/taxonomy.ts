import { backdrops, posters } from './media';
import type { Country, Genre } from '../types/content';

export const countries: Country[] = [
  {
    id: 'kr',
    name: 'Korean',
    label: 'K-Drama',
    slug: 'korean-dramas',
    flag: '대한민국',
    description:
      'Korean dramas built the modern binge. Tight 16-episode arcs, immaculate production design and romance that earns every slow-burn minute — plus the thrillers and revenge sagas that keep the internet awake at 2AM.',
    image: backdrops[0]
  },
  {
    id: 'jp',
    name: 'Japanese',
    label: 'J-Drama',
    slug: 'japanese-dramas',
    flag: '日本',
    description:
      'Japanese dramas are quieter and sharper. Ten-episode seasons, restrained performances and an eye for small human detail — from warm slice-of-life comfort watches to mysteries that never over-explain.',
    image: backdrops[2]
  },
  {
    id: 'cn',
    name: 'Chinese',
    label: 'C-Drama',
    slug: 'chinese-dramas',
    flag: '中国',
    description:
      'Chinese dramas go big. Sweeping historical epics, xianxia fantasy worlds and wuxia choreography across 40+ episode runs, alongside a fast-growing wave of modern city romances.',
    image: backdrops[1]
  }
];

export const genres: Genre[] = [
  {
    id: 'g1',
    name: 'Romance',
    slug: 'romance',
    description:
      'Slow burns, second chances and the confession scenes people rewatch a hundred times.',
    image: posters[0],
    count: 428
  },
  {
    id: 'g2',
    name: 'Thriller',
    slug: 'thriller',
    description:
      'Cold open, colder ending. Cat-and-mouse stories that refuse to let you sleep.',
    image: posters[1],
    count: 216
  },
  {
    id: 'g3',
    name: 'Historical',
    slug: 'historical',
    description:
      'Palace politics, dynasty intrigue and costume work worth pausing for.',
    image: posters[2],
    count: 197
  },
  {
    id: 'g4',
    name: 'Fantasy',
    slug: 'fantasy',
    description:
      'Immortals, body swaps and worlds where the rules bend beautifully.',
    image: posters[8],
    count: 174
  },
  {
    id: 'g5',
    name: 'Comedy',
    slug: 'comedy',
    description:
      'Workplace chaos, found families and jokes that land across languages.',
    image: posters[5],
    count: 251
  },
  {
    id: 'g6',
    name: 'Action',
    slug: 'action',
    description:
      'Wuxia blades, street chases and fight choreography with real weight.',
    image: posters[9],
    count: 143
  },
  {
    id: 'g7',
    name: 'Mystery',
    slug: 'mystery',
    description:
      'Quiet towns, missing people and answers that arrive one frame at a time.',
    image: posters[6],
    count: 165
  },
  {
    id: 'g8',
    name: 'School',
    slug: 'school',
    description:
      'Rooftops, uniforms and friendships that define a whole decade.',
    image: posters[4],
    count: 132
  },
  {
    id: 'g9',
    name: 'Slice of Life',
    slug: 'slice-of-life',
    description:
      'Late-night food, small apartments and life happening gently.',
    image: posters[3],
    count: 118
  },
  {
    id: 'g10',
    name: 'Medical',
    slug: 'medical',
    description:
      'Corridor sprints, impossible calls and the people who make them.',
    image: posters[7],
    count: 74
  },
  {
    id: 'g11',
    name: 'Crime',
    slug: 'crime',
    description:
      'Dockyards, task forces and cases that cost everyone something.',
    image: posters[9],
    count: 96
  },
  {
    id: 'g12',
    name: 'Melodrama',
    slug: 'melodrama',
    description:
      'Big feelings, earned tears and endings you argue about for weeks.',
    image: posters[0],
    count: 88
  }
];

export const genreBySlug = (slug: string) =>
  genres.find((genre) => genre.slug === slug);

export const countryBySlug = (slug: string) =>
  countries.find((country) => country.slug === slug);

export const countryById = (id: string) =>
  countries.find((country) => country.id === id);