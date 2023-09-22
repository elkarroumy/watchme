import { REDIS, TMDB } from '../../common/constants';
import { MovieIntegration } from '../../integrations/movie.integration';
import { MovieDto, ShowMovieQueriesDto, SearchMovieQueriesDto } from '../entities/dtos/movie.dto';
import MovieRepository from '../../infrastructure/database/repositories/movie.repository';
import RedisRepository from '../../infrastructure/database/repositories/redis.repository';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class MovieService {
  public constructor(
    private readonly movieRepository: MovieRepository,
    private readonly redisRepository: RedisRepository,
    private readonly movieIntegration: MovieIntegration
  ) {}

  public async showMovies(queries: ShowMovieQueriesDto) {
    const { body, statusCode } = await this.movieIntegration.getMovies(queries);

    return {
      status: statusCode,
      data: body
    };
  }

  public async addMovieToWatchList(body: MovieDto) {
    const movie = await this.movieRepository.add(body);
    if (movie) {
      this.redisRepository.set(TMDB.TYPE.MOVIE, JSON.stringify(body), REDIS.EXPIRE);
    }
    return {
      status: HttpStatus.CREATED,
      data: movie
    };
  }

  public async showWatchList() {
    const cache = await this.redisRepository.get(TMDB.TYPE.MOVIE);
    if (cache) {
      return {
        status: HttpStatus.OK,
        data: JSON.parse(cache)
      };
    }
    const watchList = await this.movieRepository.find();

    return {
      status: HttpStatus.OK,
      data: watchList
    };
  }

  public async deleteMovieFromWatchList(id: string) {
    const deletedMovie = await this.movieRepository.delete(id);

    return {
      status: HttpStatus.OK,
      data: deletedMovie.id
    };
  }

  public async searchMovies(queries: SearchMovieQueriesDto) {
    const { body, statusCode } = await this.movieIntegration.searchMovies(queries);

    return {
      status: statusCode,
      data: body
    };
  }
}
