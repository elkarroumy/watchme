import { MovieLists } from 'src/common/types/types';

export class MoviesDto {
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

export class MoviesParamsDto {
  lists: MovieLists;
  language: string;
  page: number;
}
