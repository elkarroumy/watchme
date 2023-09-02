import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { MovieResponse } from 'src/common/types/types';
import { MoviesDto, MoviesParamsDto } from 'src/core/repositories/dtos/movie.dto';
import { MovieService } from 'src/core/services/movie.service';

@Controller('movies')
export class MovieController {
  public constructor(private readonly movieService: MovieService) {}

  @Get()
  public async showMovies(@Body() moviesParams: MoviesParamsDto): Promise<MovieResponse> {
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

  @Post('/add-to-wish-list')
  public async addMovieToWishList(@Body() movies: MoviesDto): Promise<MovieResponse> {
    try {
      const movie = await this.movieService.addMovieToWishList(movies);

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
        message: 'Movie successfully added to wishlist',
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
