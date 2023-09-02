import { MovieIntegration } from 'src/integrations/movie.integration';
import { MoviesDto, MoviesParamsDto } from '../repositories/dtos/movie.dto';
import { MovieRepository } from '../repositories/movie.repository';

export class MovieService {
  public constructor(
    private readonly movieRepository: MovieRepository,
    private readonly movieIntegration: MovieIntegration
  ) {}

  public async showMovies(moviesParams: MoviesParamsDto) {
    return await this.movieIntegration.getMovies(moviesParams);
  }

  public async addMovieToWishList(movies: MoviesDto): Promise<MoviesDto> {
    return await this.movieRepository.create(movies);
  }
}
