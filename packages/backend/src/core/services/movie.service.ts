
import { MovieIntegration } from '../../integrations/movie.integration';
import { Movie, MovieParams } from '../repositories/dtos/movie.dto';
import { MovieRepository } from '../repositories/movie.repository';

export class MovieService {
  public constructor(
    private readonly movieRepository: MovieRepository,
    private readonly movieIntegration: MovieIntegration
  ) {}

  public async showMovies(moviesParams: MovieParams) {
    return await this.movieIntegration.getMovies(moviesParams);
  }

  public async addMovieToWishList(movies: Movie): Promise<any> {
    return await this.movieRepository.create(movies);
  }
}
