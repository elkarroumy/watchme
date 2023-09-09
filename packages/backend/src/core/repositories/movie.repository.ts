import { Movie } from './dtos/movie.dto';

export interface MovieRepository {
  create(data: Movie): Promise<any[]>;
}
