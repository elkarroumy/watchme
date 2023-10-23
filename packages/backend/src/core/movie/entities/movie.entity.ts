import { ApiProperty } from '@nestjs/swagger';
import { MovieDto } from './dtos/movie.dto';

export class Movie {
  @ApiProperty()
  id: string;

  @ApiProperty()
  addedAt: Date;

  @ApiProperty()
  title: string;

  @ApiProperty()
  overview: string;

  @ApiProperty()
  releaseDate: Date;

  @ApiProperty()
  runtime: number;

  @ApiProperty()
  country: string;

  @ApiProperty()
  authors: string;

  @ApiProperty()
  genre: string;

  @ApiProperty()
  ageRate: number;

  @ApiProperty()
  originalLanguage: string;

  @ApiProperty()
  budget: bigint;

  @ApiProperty()
  revenue: bigint;

  @ApiProperty()
  reviewId: string;
}

export interface MovieMethods {
  add(data: MovieDto): Promise<Movie>;
  delete(id: string): Promise<Movie>;
  find(): Promise<Movie[]>;
}
