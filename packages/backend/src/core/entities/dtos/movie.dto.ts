import { MovieList } from '../../../common/types';

export class MovieDto {
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
}

export class ShowMovieQueriesDto {
  lists: MovieList;
  language: string;
  page: number;
}

export class SearchMovieQueriesDto {
  title: string;
  language: string;
  includeAdult: boolean;
  primaryReleaseYear: string;
  page: number;
  region: string;
  year: string;
}
