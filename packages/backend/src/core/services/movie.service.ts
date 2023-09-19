import { REDIS, TMDB } from '../../common/constants';
import { MovieIntegration } from '../../integrations/movie.integration';
import { Movie, ShowMovieQueries, SearchMovieQueries } from '../repositories/dtos/movie.dto';
import MovieRepository from '../../infrastructure/database/repositories/movie.repository';
import RedisRepository from '../../infrastructure/database/repositories/redis.repository';
import { Injectable } from '@nestjs/common';
import { AppLogger } from '../../common/logger';

@Injectable()
export class MovieService {
  public constructor(
    private readonly movieRepository: MovieRepository,
    private readonly redisRepository: RedisRepository,
    private readonly movieIntegration: MovieIntegration,
    private readonly logger: AppLogger
  ) {}

  public async showMovies(queries: ShowMovieQueries) {
    this.logger.log(`${this.showMovies.name} was called in the service.`);
    const { body, statusCode } = await this.movieIntegration.getMovies(queries);

    return {
      status: statusCode,
      data: body,
      error: null
    };
  }

  public async addMovieToWatchList(body: Movie) {
    this.logger.log(`${this.addMovieToWatchList.name} was called in the service.`);
    const movie = await this.movieRepository.add(body);
    if (movie) {
      this.redisRepository.set(TMDB.TYPE.MOVIE, JSON.stringify(body), REDIS.EXPIRE);
    }
    return {
      status: 201,
      data: movie,
      error: null
    };
  }

  public async showWatchList() {
    this.logger.log(`${this.showWatchList.name} was called in the service.`);
    const cache = await this.redisRepository.get(TMDB.TYPE.MOVIE);
    if (cache) {
      return {
        status: 200,
        data: JSON.parse(cache),
        error: null
      };
    }
    const watchList = await this.movieRepository.find();

    return {
      status: 200,
      data: watchList,
      error: null
    };
  }

  public async deleteMovieFromWatchList(id: string) {
    this.logger.log(`${this.deleteMovieFromWatchList.name} was called in the service.`);
    const deletedMovie = await this.movieRepository.delete(id);

    return {
      status: 200,
      data: deletedMovie.id,
      error: null
    };
  }

  public async searchMovies(queries: SearchMovieQueries) {
    this.logger.log(`${this.searchMovies.name} was called in the service.`);
    const { body, statusCode } = await this.movieIntegration.searchMovies(queries);

    return {
      status: statusCode,
      data: body,
      error: null
    };
  }
}
