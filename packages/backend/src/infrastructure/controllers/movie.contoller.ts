import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { MovieResponse } from '../../common/types/types';
import { MovieParams, Movie } from '../../core/repositories/dtos/movie.dto';
import { MovieService } from '../../core/services/movie.service';

@Controller('movies')
export class MovieController {
  public constructor(private readonly movieService: MovieService) {}

  @Get()
  public async showMovies(moviesParams: MovieParams): Promise<MovieResponse> {
    try {
      const movie = await this.movieService.showMovies(moviesParams);

      if (!movie) {
        return {
          status: 404,
          message: 'List of movies not found',
          data: null,
          error: NotFoundException
        };
      }

      return {
        status: movie.statusCode,
        message: 'List of movies successfully obtained',
        data: movie.body,
        error: null
      };
    } catch (error) {
      return {
        status: 505,
        message: 'Something went wrong, please, try again',
        data: null,
        error
      };
    }
  }

  @Post('/add-to-watch-list')
  public async addMovieToWatchList(@Body() movies: Movie): Promise<MovieResponse> {
    try {
      const movie = await this.movieService.addMovieToWatchList(movies);

      if (!movie) {
        return {
          status: 404,
          message: 'Movie not found',
          data: null,
          error: NotFoundException
        };
      }

      return {
        status: 201,
        message: 'Movie successfully added to watchlist',
        data: movie,
        error: null
      };
    } catch (error) {
      return {
        status: 505,
        message: 'Something went wrong, please, try again',
        data: null,
        error
      };
    }
  }
}
