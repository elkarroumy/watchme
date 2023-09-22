import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../core/modules/auth.module';
import { MovieModule } from '../core/modules/movie.module';
import { ReviewModule } from '../core/modules/review.module';
import { LoggerMiddleware } from '../common/middleware/logger.middleware';
import { AppLogger } from '../helpers/logger';

@Module({
  imports: [JwtModule.register({}), AuthModule, MovieModule, ReviewModule],
  controllers: [],
  providers: [AppLogger]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
