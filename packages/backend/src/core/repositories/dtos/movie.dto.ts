import { MovieLists } from '../../../common/types/types';

export class Movie {
  id: string;
  addedAt: Date;
  title: string;
  overview: string;
  releaseDate: Date;
  runtime: number;
  country: string;
  authors: string;
  genre: string;
  ageRate: number;
  originalLanguage: string;
  budget: bigint | number;
  revenue: bigint | number;
  reviewId: string;
}

export class ShowMovieQueries {
  lists: MovieLists;
  language: string;
  page: number;
}

export class SearchMovieQueries {
  title: string;
  language: string;
  includeAdult: boolean;
  primaryReleaseYear: string;
  page: number;
  region: string;
  year: string;
}
