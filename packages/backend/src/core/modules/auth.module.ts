import { Module } from '@nestjs/common';
import { AuthenticationService } from '../services/auth/authentication.service';
import { AuthController } from '../../infrastructure/controllers/auth.controller';
import { TokenService } from '../services/auth/token.service';
import RedisRepository from '../../infrastructure/database/repositories/redis.repository';
import { AccessTokenStrategy } from '../services/auth/strategies/access-token.strategy';
import { RefreshTokenStrategy } from '../services/auth/strategies/refresh-token.strategy';
import { AppLogger } from '../../helpers/logger';
import AuthRepository from '../../infrastructure/database/repositories/auth.repository';
import { JwtService } from '@nestjs/jwt';
import { RedisStorage } from '../../infrastructure/database/redis/redis.storage';
import LogsRepository from '../../infrastructure/database/repositories/logs.repositories';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    AuthenticationService,
    AuthRepository,
    PrismaClient,
    TokenService,
    RedisRepository,
    RedisStorage,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    JwtService
  ]
})
export class AuthModule {}
