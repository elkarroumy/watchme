import { PrismaClient } from '@prisma/client';
import { Movie } from '../../../core/repositories/dtos/movie.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class PrismaRepository {
  public constructor(private readonly prisma: PrismaClient) {}

  public async addMovie(data: Movie) {
    return await this.prisma.movieWatchList.create({
      data: {
        ...data
      }
    });
  }

  public async deleteMovie(id: string) {
    return await this.prisma.movieWatchList.delete({ where: { id } });
  }

  public async getWatchList() {
    return await this.prisma.movieWatchList.findMany();
  }

  public async getMovieIdAndLanguage() {
    return await this.prisma.movieWatchList.findMany({
      select: { id: true, originalLanguage: true }
    });
  }
}
