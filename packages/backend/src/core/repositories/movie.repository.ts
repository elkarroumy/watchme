import { Movie } from './dtos/movie.dto';

export interface MovieRepository {
  addMovie(data: Movie);
}
