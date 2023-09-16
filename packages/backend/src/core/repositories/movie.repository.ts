import { Movie } from './dtos/movie.dto';

export interface Movies {
  add(data: Movie): Promise<Movie>;
  delete(id: string): Promise<Movie>;
  find(): Promise<Movie[]>;
}
