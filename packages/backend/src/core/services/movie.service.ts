import { REDIS, TMDB } from '../../common/constants';
import { MovieIntegration } from '../../integrations/movie.integration';
import { Movie, ShowMovieQueries, SearchMovieQueries } from '../repositories/dtos/movie.dto';
import PrismaRepository from '../../infrastructure/database/repositories/movie.repository';
import RedisRepository from '../../infrastructure/database/repositories/redis.repository';
import { Injectable } from '@nestjs/common';
import { AppLogger } from '../../common/logger';

@Injectable()
export class MovieService {
  public constructor(
    private readonly prismaRepository: PrismaRepository,
    private readonly redisRepository: RedisRepository,
    private readonly movieIntegration: MovieIntegration,
    private readonly logger: AppLogger
  ) {}

  public async showMovies(queries: ShowMovieQueries) {
    this.logger.log(`${this.showMovies.name} was called in service.`);
    const { body, statusCode } = await this.movieIntegration.getMovies(queries);

    return {
      status: statusCode,
      data: body,
      error: null
    };
  }

  public async addMovieToWatchList(movie: Movie) {
    this.logger.log(`${this.addMovieToWatchList.name} was called in service.`);
    const addedMovie = await this.prismaRepository.add(movie);
    if (addedMovie) {
      this.redisRepository.set(TMDB.TYPE.MOVIE, JSON.stringify(movie), REDIS.EXPIRE);
    }
    return {
      status: 201,
      data: addedMovie,
      error: null
    };
  }

  public async showWatchList() {
    this.logger.log(`${this.showWatchList.name} was called in service.`);
    const cache = await this.redisRepository.get(TMDB.TYPE.MOVIE);
    if (cache) {
      return {
        status: 200,
        data: JSON.parse(cache),
        error: null
      };
    }
    const watchList = await this.prismaRepository.find();

    return {
      status: 200,
      data: watchList,
      error: null
    };
  }

  public async deleteMovieFromWatchList(id: string) {
    this.logger.log(`${this.deleteMovieFromWatchList.name} was called in service.`);
    const deletedMovie = await this.prismaRepository.delete(id);

    return {
      status: 200,
      data: deletedMovie.id,
      error: null
    };
  }

  public async searchMovies(queries: SearchMovieQueries) {
    this.logger.log(`${this.searchMovies.name} was called in service.`);
    const { body, statusCode } = await this.movieIntegration.searchMovies(queries);

    return {
      status: statusCode,
      data: body,
      error: null
    };
  }
}
