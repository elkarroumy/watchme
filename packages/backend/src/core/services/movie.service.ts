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
    console.log(await this.prismaRepository.getMovieIdAndLanguage());
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
    const cache = this.redisRepository.get(TMDB.TYPE.MOVIE);
    if (cache) {
      return JSON.parse(await cache);
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

  public async recommedSimilarMovies() {
    const movie = await this.prismaRepository.getMovieIdAndLanguage();
    if (movie) {
      const { body, statusCode } = await this.movieIntegration.getSimilarMovieById(movie);
      this.redisRepository.set(TMDB.TYPE.SIMILAR, JSON.stringify(similarMovie), REDIS.EXPIRE);
    }
    return this.redisRepository.get(TMDB.TYPE.SIMILAR);
  }
}
