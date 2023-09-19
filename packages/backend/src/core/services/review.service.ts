import { Injectable } from '@nestjs/common';
import { ReviewDto } from '../entities/dtos/review.dto';
import ReviewRepository from '../../infrastructure/database/repositories/review.repository';
import { AppLogger } from '../../helpers/logger';

@Injectable()
export class ReviewService {
  public constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly logger: AppLogger
  ) {}

  public async createReview(body: ReviewDto) {
    this.logger.log(`${this.createReview.name} was called in the service.`);
    const review = await this.reviewRepository.create(body);

    return {
      status: 201,
      data: review,
      error: null
    };
  }

  public async showReviews() {
    this.logger.log(`${this.showReviews.name} was called in the service.`);
    const review = await this.reviewRepository.find();

    return {
      status: 200,
      data: review,
      error: null
    };
  }

  public async updateReview(id: string, body: ReviewDto) {
    this.logger.log(`${this.updateReview.name} was called in the service.`);
    const review = await this.reviewRepository.update(id, body);

    return {
      status: 200,
      data: review,
      error: null
    };
  }

  public async deleteReview(id: string) {
    this.logger.log(`${this.deleteReview.name} was called in the service.`);
    const review = await this.reviewRepository.delete(id);

    return {
      status: 200,
      data: review,
      error: null
    };
  }
}
