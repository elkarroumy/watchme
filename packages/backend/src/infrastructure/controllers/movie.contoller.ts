import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { ServerResponse } from '../../common/types';
import {
  MovieDto,
  SearchMovieQueriesDto,
  ShowMovieQueriesDto
} from '../../core/entities/dtos/movie.dto';
import { MovieService } from '../../core/services/movie.service';
import { AppLogger } from '../../helpers/logger';
import { AccessTokenGuard } from '../../core/services/auth/guards/access-token.guard';

@Controller('movies')
export class MovieController {
  public constructor(
    private readonly movieService: MovieService,
    private readonly logger: AppLogger
  ) {}

  @Get()
  public async showMovies(@Query() queries: ShowMovieQueriesDto): Promise<ServerResponse> {
    this.logger.log(`${this.showMovies.name} was called in the controller.`);
    try {
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
  @UseGuards(AccessTokenGuard)
  public async addMovieToWatchList(@Body() body: MovieDto): Promise<ServerResponse> {
    this.logger.log(`${this.showMovies.name} was called in the controller.`);
    try {
      const movie = await this.movieService.addMovieToWatchList(body);
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
  @UseGuards(AccessTokenGuard)
  public async showWatchList(): Promise<ServerResponse> {
    this.logger.log(`${this.showWatchList.name} was called in the controller.`);
    try {
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
  @UseGuards(AccessTokenGuard)
  public async deleteMovieFromWatchList(@Param('id') id: string): Promise<ServerResponse> {
    this.logger.log(`${this.deleteMovieFromWatchList.name} was called in the controller.`);
    try {
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
  public async searchMovies(@Query() queries: SearchMovieQueriesDto): Promise<ServerResponse> {
    this.logger.log(`${this.deleteMovieFromWatchList.name} was called in the controller.`);
    try {
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
