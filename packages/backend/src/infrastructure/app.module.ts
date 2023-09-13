import { Module } from '@nestjs/common';
import { MovieService } from '../core/services/movie.service';
import { MovieController } from './controllers/movie.contoller';
import { MovieIntegration } from '../integrations/movie.integration';
import RedisRepository from './database/repositories/redis.repository';
import { RedisStorage } from './database/redis/redis.storage';
import { AppLogger } from '../common/logger';
import { PrismaClient } from '@prisma/client';
import PrismaRepository from './database/repositories/prisma.repository';

@Module({
  imports: [],
  controllers: [MovieController],
  providers: [
    MovieService,
    RedisRepository,
    RedisStorage,
    MovieIntegration,
    AppLogger,
    PrismaClient,
    PrismaRepository
  ]
})
export class AppModule {}
