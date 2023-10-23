import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../core/auth/auth.module';
import { MovieModule } from '../core/movie/movie.module';
import { ReviewModule } from '../core/review/review.module';
import { LoggerMiddleware } from '../common/middlewares/logger.middleware';
import { AppLogger } from '../helpers/logger';
import LogsRepository from './database/repositories/logs.repositories';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [JwtModule.register({}), AuthModule, MovieModule, ReviewModule],
  controllers: [],
  providers: [AppLogger, LogsRepository, PrismaClient]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
