import { PrismaClient } from '@prisma/client';
import { ReviewDto } from '../../../core/review/entities/dtos/review.dto';
import { Review, ReviewMethods } from '../../../core/review/entities/review.entity';
import { Injectable } from '@nestjs/common';

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

  public async findReviewComment(id: string) {
    return await this.prisma.reviewComment.findUnique({
      where: { id }
    });
  }
}
