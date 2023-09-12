import { MovieLists } from '../../../common/types/types';

export class Movie {
  addedAt: Date;
  title: string;
  overview: string;
  releaseDate: Date;
  time: number;
  country: string;
  authors: string;
  genre: string;
  ageRate: number;
  originalLanguage: string;
  budget: bigint | number;
  revenue: bigint | number;
}

export class ShowMovieParams {
  lists: MovieLists;
  language: string;
  page: number;
}

export class SearchMovieParams {
  title: string;
  language: string;
  includeAdult: boolean;
  primaryReleaseYear: string;
  page: number;
  region: string;
  year: string;
}

export class MovieParams {
  language: string;
  page: number;
  region: string;
}
