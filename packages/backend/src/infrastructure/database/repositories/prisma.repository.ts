import { PrismaClient } from '@prisma/client';
import { MoviesDto } from 'src/core/repositories/dtos/movie.dto';
import { MovieRepository } from 'src/core/repositories/movie.repository';

export default class PrismaRepository implements MovieRepository {
  public constructor(private readonly prismaClient: PrismaClient) {}

  public async create(data: MoviesDto): Promise<MoviesDto> {
    return await this.prismaClient.movie.create({
      data
    });
  }
}
