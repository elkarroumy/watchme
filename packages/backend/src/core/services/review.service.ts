import { Injectable } from '@nestjs/common';
import PrismaRepository from '../../infrastructure/database/repositories/prisma.repository';
import { Review } from '../repositories/dtos/review.dto';

@Injectable()
export class ReviewService {
  public constructor(private readonly prismaRepository: PrismaRepository) {}

  public async createReview(review: Review) {
    return await this.prismaRepository.createReview(review);
  }

  public async showReview() {
    return await this.prismaRepository.showReview();
  }

  public async deleteReview(id: string) {
    return await this.prismaRepository.deleteReview(id);
  }
}
