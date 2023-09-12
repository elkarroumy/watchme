import { Movie } from './dtos/movie.dto';

export interface PostgresRepository {
  addMovie(data: Movie);
  deleteMovie(id: number);
  getWatchList();
}
