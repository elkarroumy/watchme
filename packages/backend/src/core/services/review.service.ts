import { Injectable } from '@nestjs/common';
import { Review } from '../repositories/dtos/review.dto';
import ReviewRepository from '../../infrastructure/database/repositories/review.repository';
import { AppLogger } from '../../common/logger';

@Injectable()
export class ReviewService {
  public constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly logger: AppLogger
  ) {}

  public async createReview(body: Review) {
    this.logger.log(`${this.createReview.name} was called in the service.`);
    const review = await this.reviewRepository.create(body);

    return {
      status: 201,
      data: review,
      error: null
    };
  }

  public async showReview() {
    this.logger.log(`${this.showReview.name} was called in the service.`);
    const review = await this.reviewRepository.find();

    return {
      status: 200,
      data: review,
      error: null
    };
  }

  public async updateReview(id: string, body: Review) {
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
