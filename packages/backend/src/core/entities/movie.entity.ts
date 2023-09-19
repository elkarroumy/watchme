import { MovieDto } from './dtos/movie.dto';

export interface Movie {
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

export interface MovieMethods {
  add(data: MovieDto): Promise<Movie>;
  delete(id: string): Promise<Movie>;
  find(): Promise<Movie[]>;
}
