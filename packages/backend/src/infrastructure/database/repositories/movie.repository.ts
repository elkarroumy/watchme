import { PrismaClient } from '@prisma/client';
import { MovieDto } from '../../../core/entities/dtos/movie.dto';
import { Movie, MovieMethods } from '../../../core/entities/movie.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class MovieRepository implements MovieMethods {
  public constructor(private readonly prisma: PrismaClient) {}

  public async add(data: MovieDto): Promise<Movie> {
    return await this.prisma.movie.create({ data });
  }

  public async delete(id: string): Promise<Movie> {
    return await this.prisma.movie.delete({ where: { id } });
  }

  public async find(): Promise<Movie[]> {
    return await this.prisma.movie.findMany();
  }
}
