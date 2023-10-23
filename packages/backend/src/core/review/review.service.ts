import { HttpStatus, Injectable } from '@nestjs/common';
import { ReviewDto } from './entities/dtos/review.dto';
import ReviewRepository from '../../infrastructure/database/repositories/review.repository';

@Injectable()
export class ReviewService {
  public constructor(private readonly reviewRepository: ReviewRepository) {}

  public async createReview(body: ReviewDto) {
    const review = await this.reviewRepository.create(body);

    return {
      status: HttpStatus.CREATED,
      data: review
    };
  }

  public async showReviews() {
    const review = await this.reviewRepository.find();

    return {
      status: HttpStatus.OK,
      data: review
    };
  }

  public async updateReview(id: string, body: ReviewDto) {
    const review = await this.reviewRepository.update(id, body);

    return {
      status: HttpStatus.OK,
      data: review
    };
  }

  public async deleteReview(id: string) {
    const review = await this.reviewRepository.delete(id);

    return {
      status: HttpStatus.OK,
      data: review
    };
  }

  public async getReviewComment(id: string) {
    const comment = await this.reviewRepository.findReviewComment(id);

    return {
      status: HttpStatus.OK,
      data: comment
    };
  }
}
