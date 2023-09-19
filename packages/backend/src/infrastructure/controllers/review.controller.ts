import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { ReviewService } from '../../core/services/review.service';
import { ReviewDto } from '../../core/entities/dtos/review.dto';
import { AppLogger } from '../../helpers/logger';
import { ServerResponse } from '../../common/types';
import { AccessTokenGuard } from '../../core/services/auth/guards/access-token.guard';

@Controller('reviews')
export class ReviewController {
  public constructor(
    private readonly reviewService: ReviewService,
    private readonly logger: AppLogger
  ) {}

  @Post('/create')
  @UseGuards(AccessTokenGuard)
  public async createReview(@Body() body: ReviewDto): Promise<ServerResponse> {
    this.logger.log(`${this.createReview.name} was called in the controller.`);
    try {
      const review = await this.reviewService.createReview(body);
      if (!review) {
        return {
          status: 404,
          message: 'Review not found',
          data: null,
          error: NotFoundException
        };
      }
      return {
        status: review.status,
        message: 'Review was successfully created',
        data: review.data,
        error: review.error
      };
    } catch (error) {
      this.logger.error(error);
      return {
        status: 505,
        message: 'Something went wrong, please, try again',
        data: null,
        error
      };
    }
  }

  @Get('/get')
  public async showReviews(): Promise<ServerResponse> {
    this.logger.log(`${this.showReviews.name} was called in the controller.`);
    try {
      const review = await this.reviewService.showReviews();
      if (!review) {
        return {
          status: 404,
          message: 'Review not found',
          data: null,
          error: NotFoundException
        };
      }
      return {
        status: review.status,
        message: 'List of movies were successfully obtained',
        data: review.data,
        error: review.error
      };
    } catch (error) {
      this.logger.error(error);
      return {
        status: 505,
        message: 'Something went wrong, please, try again',
        data: null,
        error
      };
    }
  }

  @Put('/update/:id')
  @UseGuards(AccessTokenGuard)
  public async updateReview(
    @Param('id') id: string,
    @Body() body: ReviewDto
  ): Promise<ServerResponse> {
    this.logger.log(`${this.updateReview.name} was called in the controller.`);
    try {
      const review = await this.reviewService.updateReview(id, body);
      if (!review) {
        return {
          status: 404,
          message: 'Review not found',
          data: null,
          error: NotFoundException
        };
      }
      return {
        status: review.status,
        message: 'Review was successfully updated',
        data: review.data,
        error: review.error
      };
    } catch (error) {
      this.logger.error(error);
      return {
        status: 505,
        message: 'Something went wrong, please, try again',
        data: null,
        error
      };
    }
  }

  @Delete('/delete/:id')
  @UseGuards(AccessTokenGuard)
  public async deleteReview(@Param('id') id: string): Promise<ServerResponse> {
    this.logger.log(`${this.deleteReview.name} was called in the controller.`);
    try {
      const review = await this.reviewService.deleteReview(id);
      if (!review) {
        return {
          status: 404,
          message: 'Review not found',
          data: null,
          error: NotFoundException
        };
      }
      return {
        status: review.status,
        message: 'Review was successfully deleted',
        data: review.data,
        error: review.error
      };
    } catch (error) {
      this.logger.error(error);
      return {
        status: 505,
        message: 'Something went wrong, please, try again',
        data: null,
        error
      };
    }
  }
}
