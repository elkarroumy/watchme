import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../core/modules/auth.module';
import { MovieModule } from '../core/modules/movie.module';
import { ReviewModule } from '../core/modules/review.module';

@Module({
  imports: [JwtModule.register({}), AuthModule, MovieModule, ReviewModule],
  controllers: [],
  providers: []
})
export class AppModule {}
