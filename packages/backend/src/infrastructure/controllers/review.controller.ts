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
import { ReviewService } from '../../core/review/review.service';
import { ReviewDto } from '../../core/review/entities/dtos/review.dto';
import { ServerResponse } from '../../common/types';
import { JwtAccessGuard } from '../../common/guards/access-token.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import {
  responseSchema,
  notFoundSchema,
  unauthorizedSchema,
  internalServerErrorSchema
} from '../../common/documents/schemas';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
  public constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @ApiBody({ type: ReviewDto })
  @ApiCreatedResponse(responseSchema)
  @ApiNotFoundResponse(notFoundSchema)
  @ApiOperation({ summary: 'Create review' })
  @ApiUnauthorizedResponse(unauthorizedSchema)
  @ApiInternalServerErrorResponse(internalServerErrorSchema)
  public async createReview(@Body() body: ReviewDto): Promise<ServerResponse> {
    const review = await this.reviewService.createReview(body);
    if (!review) {
      return {
        status: 404,
        message: 'Review not found',
        data: null
      };
    }
    return {
      status: review.status,
      message: 'Review was successfully created',
      data: review.data
    };
  }

  @Get()
  @ApiCreatedResponse(responseSchema)
  @ApiNotFoundResponse(notFoundSchema)
  @ApiOperation({ summary: 'Show reviews' })
  @ApiInternalServerErrorResponse(internalServerErrorSchema)
  public async showReviews(): Promise<ServerResponse> {
    const review = await this.reviewService.showReviews();
    if (!review) {
      return {
        status: 404,
        message: 'Review not found',
        data: null
      };
    }
    return {
      status: review.status,
      message: 'List of movies were successfully obtained',
      data: review.data
    };
  }

  @Put('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @ApiBody({ type: ReviewDto })
  @ApiCreatedResponse(responseSchema)
  @ApiNotFoundResponse(notFoundSchema)
  @ApiParam({ type: 'string', name: 'id' })
  @ApiOperation({ summary: 'Update review' })
  @ApiUnauthorizedResponse(unauthorizedSchema)
  @ApiInternalServerErrorResponse(internalServerErrorSchema)
  public async updateReview(
    @Param('id') id: string,
    @Body() body: ReviewDto
  ): Promise<ServerResponse> {
    const review = await this.reviewService.updateReview(id, body);
    if (!review) {
      return {
        status: 404,
        message: 'Review not found',
        data: null
      };
    }
    return {
      status: review.status,
      message: 'Review was successfully updated',
      data: review.data
    };
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @ApiCreatedResponse(responseSchema)
  @ApiNotFoundResponse(notFoundSchema)
  @ApiParam({ type: 'string', name: 'id' })
  @ApiOperation({ summary: 'Delete review' })
  @ApiUnauthorizedResponse(unauthorizedSchema)
  @ApiInternalServerErrorResponse(internalServerErrorSchema)
  public async deleteReview(@Param('id') id: string): Promise<ServerResponse> {
    const review = await this.reviewService.deleteReview(id);
    if (!review) {
      return {
        status: 404,
        message: 'Review not found',
        data: null
      };
    }
    return {
      status: review.status,
      message: 'Review was successfully deleted',
      data: review.data
    };
  }
}
