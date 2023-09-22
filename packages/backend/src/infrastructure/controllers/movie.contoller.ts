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
import { JwtAccessGuard } from '../../common/guards/access-token.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import {
  responseSchema,
  internalServerErrorSchema,
  notFoundSchema,
  unauthorizedSchema
} from '../../common/documents/schemas';

@ApiTags('Movies')
@Controller('movies')
export class MovieController {
  public constructor(private readonly movieService: MovieService) {}

  @Get()
  @ApiQuery({
    name: 'list',
    type: String
  })
  @ApiQuery({
    name: 'language',
    type: String
  })
  @ApiQuery({
    name: 'page',
    type: Number
  })
  @ApiOperation({ summary: 'Show movies' })
  @ApiResponse({ status: 200, ...responseSchema })
  @ApiNotFoundResponse(notFoundSchema)
  @ApiInternalServerErrorResponse(internalServerErrorSchema)
  public async showMovies(@Query() queries: ShowMovieQueriesDto): Promise<ServerResponse> {
    const movie = await this.movieService.showMovies(queries);
    if (!movie) {
      return {
        status: 404,
        message: 'List of movies not found',
        data: null
      };
    }
    return {
      status: movie.status,
      message: 'List of movies were successfully obtained',
      data: movie.data
    };
  }

  @Post('/watch-list/add')
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @ApiBody({ type: MovieDto })
  @ApiCreatedResponse(responseSchema)
  @ApiNotFoundResponse(notFoundSchema)
  @ApiUnauthorizedResponse(unauthorizedSchema)
  @ApiOperation({ summary: 'Add movie to watch list' })
  @ApiInternalServerErrorResponse(internalServerErrorSchema)
  public async addMovieToWatchList(@Body() body: MovieDto): Promise<ServerResponse> {
    const movie = await this.movieService.addMovieToWatchList(body);
    if (!movie) {
      return {
        status: 404,
        message: 'Movie not found',
        data: null
      };
    }
    return {
      status: movie.status,
      message: 'Movie was successfully added to watchlist',
      data: movie.data
    };
  }

  @Get('/watch-list')
  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Watch list' })
  @ApiCreatedResponse(responseSchema)
  @ApiNotFoundResponse(notFoundSchema)
  @ApiUnauthorizedResponse(unauthorizedSchema)
  @ApiInternalServerErrorResponse(internalServerErrorSchema)
  public async showWatchList(): Promise<ServerResponse> {
    const movie = await this.movieService.showWatchList();
    if (!movie) {
      return {
        status: 404,
        message: 'Movies in watch list not found',
        data: null
      };
    }
    return {
      status: movie.status,
      message: 'Watchlist successfully obtained',
      data: movie.data
    };
  }

  @Delete('/watch-list/delete')
  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth()
  @ApiParam({ type: 'string', name: 'id' })
  @ApiOperation({ summary: 'Delete movie from watch list' })
  @ApiCreatedResponse(responseSchema)
  @ApiNotFoundResponse(notFoundSchema)
  @ApiUnauthorizedResponse(unauthorizedSchema)
  @ApiInternalServerErrorResponse(internalServerErrorSchema)
  public async deleteMovieFromWatchList(@Param('id') id: string): Promise<ServerResponse> {
    const movie = await this.movieService.deleteMovieFromWatchList(id);
    if (!movie) {
      return {
        status: 404,
        message: 'Movies in watch list not found',
        data: null
      };
    }
    return {
      status: movie.status,
      message: 'Movie was successfully deleted from watchlist',
      data: movie.data
    };
  }

  @Get('/search')
  @ApiQuery({
    name: 'title',
    type: String
  })
  @ApiQuery({
    name: 'language',
    type: String
  })
  @ApiQuery({
    name: 'includeAdult',
    type: Boolean
  })
  @ApiQuery({
    name: 'primaryReleaseYear',
    type: String
  })
  @ApiQuery({
    name: 'page',
    type: Number
  })
  @ApiQuery({
    name: 'region',
    type: String
  })
  @ApiQuery({
    name: 'year',
    type: String
  })
  @ApiOperation({ summary: 'Search movies' })
  @ApiCreatedResponse(responseSchema)
  @ApiNotFoundResponse(notFoundSchema)
  @ApiInternalServerErrorResponse(internalServerErrorSchema)
  public async searchMovies(@Query() queries: SearchMovieQueriesDto): Promise<ServerResponse> {
    const movie = await this.movieService.searchMovies(queries);
    if (!movie) {
      return {
        status: 404,
        message: 'Movie not found',
        data: null
      };
    }
    return {
      status: movie.status,
      message: 'Movie was successfully obtained',
      data: movie.data
    };
  }
}
