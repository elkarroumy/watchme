import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AppLogger } from '../common/logger';
import { MovieService } from '../core/services/movie.service';
import { MovieIntegration } from '../integrations/movie.integration';
import { RedisStorage } from './database/redis/redis.storage';
import MovieRepository from './database/repositories/movie.repository';
import RedisRepository from './database/repositories/redis.repository';
import { MovieController } from './controllers/movie.contoller';
import { ReviewService } from '../core/services/review.service';
import ReviewRepository from './database/repositories/review.repository';
import { ReviewController } from './controllers/review.controller';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from '../core/services/auth/strategies/access-token.strategy';
import { RefreshTokenStrategy } from '../core/services/auth/strategies/refresh-token.strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [MovieController, ReviewController],
  providers: [
    AppLogger,
    MovieService,
    MovieIntegration,
    MovieRepository,
    ReviewService,
    ReviewRepository,
    RedisRepository,
    RedisStorage,
    PrismaClient,
    AccessTokenStrategy,
    RefreshTokenStrategy
  ]
})
export class AppModule {}
