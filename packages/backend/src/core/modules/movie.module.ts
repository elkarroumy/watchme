import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import RedisRepository from '../../infrastructure/database/repositories/redis.repository';
import { AppLogger } from '../../helpers/logger';
import { MovieService } from '../services/movie.service';
import { MovieController } from '../../infrastructure/controllers/movie.contoller';
import MovieRepository from '../../infrastructure/database/repositories/movie.repository';
import { MovieIntegration } from '../../integrations/movie.integration';
import { RedisStorage } from '../../infrastructure/database/redis/redis.storage';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [MovieController],
  providers: [
    MovieService,
    PrismaClient,
    RedisRepository,
    MovieRepository,
    MovieIntegration,
    AppLogger,
    RedisStorage,
    JwtService
  ]
})
export class MovieModule {}
