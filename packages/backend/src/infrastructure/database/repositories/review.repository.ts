import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ReviewDto } from '../../../core/entities/dtos/review.dto';
import { Review, ReviewMethods } from '../../../core/entities/review.entity';

@Injectable()
export default class ReviewRepository implements ReviewMethods {
  public constructor(private readonly prisma: PrismaClient) {}

  public async create(data: ReviewDto): Promise<Review> {
    return await this.prisma.review.create({ data });
  }

  public async find(): Promise<Review[]> {
    return await this.prisma.review.findMany();
  }

  public async update(id: string, data: ReviewDto): Promise<Review> {
    return await this.prisma.review.update({
      data,
      where: { id }
    });
  }

  public async delete(id: string): Promise<Review> {
    return await this.prisma.review.delete({ where: { id } });
  }
}
