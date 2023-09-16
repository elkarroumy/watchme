import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseFilters
} from '@nestjs/common';
import { MovieResponse } from '../../common/types/types';
import {
  Movie,
  SearchMovieQueries,
  ShowMovieQueries
} from '../../core/repositories/dtos/movie.dto';
import { MovieService } from '../../core/services/movie.service';
import { AppLogger } from '../../common/logger';

@Controller('movies')
export class MovieController {
  public constructor(
    private readonly movieService: MovieService,
    private readonly logger: AppLogger
  ) {}

  @Get()
  public async showMovies(@Query() queries: ShowMovieQueries) {
    try {
      this.logger.log(`${this.showMovies.name} was called in controller`);
      const movie = await this.movieService.showMovies(queries);
      if (!movie) {
        return {
          status: 404,
          message: 'List of movies not found',
          data: null,
          error: NotFoundException
        };
      }
      return {
        status: movie.status,
        message: 'List of movies were successfully obtained',
        data: movie.data,
        error: movie.error
      };
    } catch (error) {
      this.logger.error(error);
      return {
        status: 505,
        message: 'Something went wrong, please, try again',
        data: null,
        error
      };
    }
  }

  @Post('/watch-list/add')
  public async addMovieToWatchList(@Body() movies: Movie): Promise<MovieResponse> {
    try {
      this.logger.log(`${this.showMovies.name} was called in controller`);
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
        status: movie.status,
        message: 'Movie was successfully added to watchlist',
        data: movie.data,
        error: movie.error
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

  @Get('/watch-list')
  public async showWatchList(): Promise<MovieResponse> {
    try {
      this.logger.log(`${this.showWatchList.name} was called in controller`);
      const movie = await this.movieService.showWatchList();
      if (!movie) {
        return {
          status: 404,
          message: 'Movies in watch list not found',
          data: null,
          error: NotFoundException
        };
      }
      return {
        status: movie.status,
        message: 'Watchlist successfully obtained',
        data: movie.data,
        error: movie.error
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

  @Delete('/watch-list/delete')
  public async deleteMovieFromWatchList(@Param('id') id: string): Promise<MovieResponse> {
    try {
      this.logger.log(`${this.deleteMovieFromWatchList.name} was called in controller`);
      const movie = await this.movieService.deleteMovieFromWatchList(id);
      if (!movie) {
        return {
          status: 404,
          message: 'Movies in watch list not found',
          data: null,
          error: NotFoundException
        };
      }
      return {
        status: movie.status,
        message: 'Movie was successfully deleted from watchlist',
        data: movie.data,
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

  @Get('/search')
  public async searchMovies(@Query() queries: SearchMovieQueries): Promise<MovieResponse> {
    try {
      this.logger.log(`${this.deleteMovieFromWatchList.name} was called in controller`);
      const movie = await this.movieService.searchMovies(queries);
      if (!movie) {
        return {
          status: 404,
          message: 'Movie not found',
          data: null,
          error: NotFoundException
        };
      }
      return {
        status: movie.status,
        message: 'Movie was successfully obtained',
        data: movie.data,
        error: movie.error
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
