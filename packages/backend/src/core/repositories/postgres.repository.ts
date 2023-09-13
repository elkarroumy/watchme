import { Movie } from './dtos/movie.dto';

export interface Postgres {
  addMovie(data: Movie);
  deleteMovie(id: number);
  getWatchList();
  getMovieIdAndLanguage();
}
