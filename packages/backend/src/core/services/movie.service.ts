import { PrismaClient } from '@prisma/client';
import { MovieLists } from 'src/common/types/types';
import { MovieIntegration } from 'src/integrations/movie.integration';
import { MoviesDto, MoviesParamsDto } from '../repositories/dtos/movie.dto';

export class MovieService {
  public constructor(
    private readonly movieIntegration: MovieIntegration,
    private readonly prismaClient: PrismaClient
  ) {}

  public async showMovies(moviesParams: MoviesParamsDto) {
    return await this.movieIntegration.getMovies(moviesParams);
  }

  public async addMovieToWishList(movies: MoviesDto) {
    const movie = await this.prismaClient.movie.create({
      data: {
        ...movies
      }
    });

    return movie;
  }
}
