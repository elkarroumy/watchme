import { Injectable } from '@nestjs/common';
import { Review } from '../repositories/dtos/review.dto';
import ReviewRepository from '../../infrastructure/database/repositories/review.repository';

@Injectable()
export class ReviewService {
  public constructor(private readonly reviewRepository: ReviewRepository) {}

  public async createReview(review: Review) {
    return await this.reviewRepository.create(review);
  }

  public async showReview() {
    return await this.reviewRepository.find();
  }

  public async updateReview(id: string, review: Review) {
    return await this.reviewRepository.update(id, review);
  }

  public async deleteReview(id: string) {
    return await this.reviewRepository.delete(id);
  }
}
