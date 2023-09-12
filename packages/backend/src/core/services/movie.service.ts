import { REDIS, TMDB } from '../../common/constants/constants';
import { MovieIntegration } from '../../integrations/movie.integration';
import {
  Movie,
  ShowMovieParams,
  SearchMovieParams,
  MovieParams
} from '../repositories/dtos/movie.dto';
import { PostgresRepository } from '../repositories/postgres.repository';
import { RedisRepository } from '../repositories/redis.repository';

export class MovieService {
  public constructor(
    private readonly postgresRepository: PostgresRepository,
    private readonly movieIntegration: MovieIntegration,
    private readonly redisRepository: RedisRepository
  ) {}

  public async showMovies(params: ShowMovieParams) {
    return await this.movieIntegration.getMovies(params);
  }

  public async addMovieToWatchList(movie: Movie) {
    const addedMovie = await this.postgresRepository.addMovie(movie);
    if (addedMovie) {
      this.redisRepository.saveMovie(TMDB.TYPE.MOVIE, JSON.stringify(movie), REDIS.EXPIRE);
    }
    return addedMovie;
  }

  public async showWatchList() {
    const cache = this.redisRepository.getMovie(TMDB.TYPE.MOVIE);
    if (cache) {
      return JSON.parse(cache);
    }
    return await this.postgresRepository.getWatchList();
  }

  public async deleteMovieFromWatchList(id: number) {
    return await this.postgresRepository.deleteMovie(id);
  }

  public async searchMovie(params: SearchMovieParams) {
    return await this.movieIntegration.searchMovies(params);
  }

  public async showMostPopularMovies(params: MovieParams) {
    return await this.movieIntegration.getMostPopularMovies(params);
  }

  public async showTopRatedMovies(params: MovieParams) {
    return await this.movieIntegration.getTopRatedMovies(params);
  }

  public async showUpcomingReleases(params: MovieParams) {
    return await this.movieIntegration.getUpcomingReleases(params);
  }

  public async recommedSimilarMovies() {
    const movie = await this.postgresRepository.getMovieIdAndLanguage();
    if (movie) {
      const similarMovie = await this.movieIntegration.getSimilarMovieById(movie.id, movie.language, 1);
      this.redisRepository.saveMovie(TMDB.TYPE.SIMILAR, JSON.stringify(similarMovie), REDIS.EXPIRE);
    }
    return this.redisRepository.getMovie(TMDB.TYPE.SIMILAR);
  }
}
