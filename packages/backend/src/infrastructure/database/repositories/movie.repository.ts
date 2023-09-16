import { PrismaClient } from '@prisma/client';
import { Movie } from '../../../core/repositories/dtos/movie.dto';
import { Injectable } from '@nestjs/common';
import { Movies } from '../../../core/repositories/movie.repository';

@Injectable()
export default class MovieRepository implements Movies {
  public constructor(private readonly prisma: PrismaClient) {}

  public async add(data: Movie): Promise<Movie> {
    return await this.prisma.movie.create({ data });
  }

  public async delete(id: string): Promise<Movie> {
    return await this.prisma.movie.delete({ where: { id } });
  }

  public async find(): Promise<Movie[]> {
    return await this.prisma.movie.findMany();
  }
}
