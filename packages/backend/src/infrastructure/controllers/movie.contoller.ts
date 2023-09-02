import { MoviesParamsDto } from 'src/core/repositories/dtos/movie.dto';
import { MovieService } from 'src/core/services/movie.service';

export class MovieController {
  public constructor(private readonly movieService: MovieService) {}

  public async showMovies(moviesParams: MoviesParamsDto) {
    return await this.movieService.showMovies(moviesParams);
  }
}
