import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Review } from '../../../core/repositories/dtos/review.dto';
import { Reviews } from '../../../core/repositories/review.repository';

@Injectable()
export default class ReviewRepository implements Reviews {
  public constructor(private readonly prisma: PrismaClient) {}

  public async create(data: Review) {
    return await this.prisma.review.create({ data });
  }

  public async find() {
    return await this.prisma.review.findMany();
  }

  public async update(id: string, data: Review) {
    return await this.prisma.review.update({
      data,
      where: { id }
    });
  }

  public async delete(id: string) {
    return await this.prisma.review.delete({ where: { id } });
  }
}
