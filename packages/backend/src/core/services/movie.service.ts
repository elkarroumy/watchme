import { REDIS, TMDB } from '../../common/constants/constants';
import { MovieIntegration } from '../../integrations/movie.integration';
import {
  Movie,
  ShowMovieParams,
  SearchMovieParams,
  MovieParams
} from '../repositories/dtos/movie.dto';
import PrismaRepository from '../../infrastructure/database/repositories/prisma.repository';
import RedisRepository from '../../infrastructure/database/repositories/redis.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieService {
  public constructor(
    private readonly prismaRepository: PrismaRepository,
    private readonly redisRepository: RedisRepository,
    private readonly movieIntegration: MovieIntegration
  ) {}

  public async showMovies(params: ShowMovieParams) {
    return await this.movieIntegration.getMovies(params);
  }

  public async addMovieToWatchList(movie: Movie) {
    const addedMovie = await this.prismaRepository.addMovie(movie);
    if (addedMovie) {
      this.redisRepository.set(TMDB.TYPE.MOVIE, JSON.stringify(movie), REDIS.EXPIRE);
    }
    return addedMovie;
  }

  public async showWatchList() {
    const cache = await this.redisRepository.get(TMDB.TYPE.MOVIE);
    if (cache) {
      return JSON.parse(cache);
    }
    return await this.prismaRepository.getWatchList();
  }

  public async deleteMovieFromWatchList(id: string) {
    return await this.prismaRepository.deleteMovie(id);
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
}