import { Module } from '@nestjs/common';
import { MovieService } from '../core/services/movie.service';
import { MovieController } from './controllers/movie.contoller';

@Module({
  imports: [],
  controllers: [MovieController],
  providers: [MovieService]
})
export class AppModule {}
