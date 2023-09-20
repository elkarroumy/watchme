import { ApiProperty } from '@nestjs/swagger';
import { MovieList } from '../../../common/types';

export class MovieDto {
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
}

export class ShowMovieQueriesDto {
  lists: MovieList;
  language: string;
  page: number;
}

export class SearchMovieQueriesDto {
  title: string;
  language: string;
  includeAdult: boolean;
  primaryReleaseYear: string;
  page: number;
  region: string;
  year: string;
}
