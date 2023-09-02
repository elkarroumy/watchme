import { Module } from '@nestjs/common';
import { MovieService } from 'src/core/services/movie.service';
import { MovieController } from './controllers/movie.contoller';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [],
  controllers: [MovieController],
  providers: [MovieService, PrismaClient]
})
export class AppModule {}
