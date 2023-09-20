import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AppLogger } from '../../helpers/logger';
import { ReviewController } from '../../infrastructure/controllers/review.controller';
import { ReviewService } from '../services/review.service';
import ReviewRepository from '../../infrastructure/database/repositories/review.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [ReviewController],
  providers: [ReviewService, PrismaClient, AppLogger, ReviewRepository, JwtService]
})
export class ReviewModule {}
