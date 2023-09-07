import { MoviesDto } from './dtos/movie.dto';

export interface MovieRepository {
  create(data: MoviesDto): Promise<any[]>;
}
