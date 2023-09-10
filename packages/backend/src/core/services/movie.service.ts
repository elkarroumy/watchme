
import { MovieIntegration } from '../../integrations/movie.integration';
import { Movie, MovieParams } from '../repositories/dtos/movie.dto';
import { MovieRepository } from '../repositories/movie.repository';

export class MovieService {
  public constructor(
    private readonly movieRepository: MovieRepository,
    private readonly movieIntegration: MovieIntegration
  ) {}

  public async showMovies(movieParams: MovieParams) {
    return await this.movieIntegration.getMovies(movieParams);
  }

  public async addMovieToWatchList(movies: Movie): Promise<any> {
    return await this.movieRepository.addMovie(movies);


  }

  public async deleteMovieFromWatchList() {}

  // title, description, genres, authors, runtime, score
  public async filterMovies() {}

  public async getMostPopularMovies() {}

  public async getFavoriteMovies() {}

  public async recommedSimilarMoviesFromWatchList() {}

  public async getUpcomingReleases() {}

  
}
