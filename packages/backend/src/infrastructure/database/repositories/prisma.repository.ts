import { PrismaClient } from '@prisma/client';
import { Movie } from '../../../core/repositories/dtos/movie.dto';
import { Injectable } from '@nestjs/common';
import { Review } from '../../../core/repositories/dtos/review.dto';

@Injectable()
export default class PrismaRepository {
  public constructor(private readonly prisma: PrismaClient) {}

  public async addMovie(data: Movie) {
    return await this.prisma.movieWatchList.create({ data });
  }

  public async deleteMovie(id: string) {
    return await this.prisma.movieWatchList.delete({ where: { id } });
  }

  public async getWatchList() {
    return await this.prisma.movieWatchList.findMany();
  }

  public async createReview(data: Review) {
    return await this.prisma.review.create({ data });
  }

  public async showReview() {
    return await this.prisma.review.findMany();
  }

  public async deleteReview(id: string) {
    return await this.prisma.review.delete({ where: { id } });
  }
}
