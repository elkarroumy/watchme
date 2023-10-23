import { Injectable } from '@nestjs/common';
import { TMDB } from '../common/constants';
import { ShowMovieQueriesDto, SearchMovieQueriesDto } from '../core/movie/entities/dtos/movie.dto';
import { request } from 'undici';

@Injectable()
export class TheMovieDatabaseIntegration {
  public async getMovies({ lists, language, page }: ShowMovieQueriesDto) {
    const { body, statusCode } = await request(
      `${TMDB.URL}/${TMDB.TYPE.MOVIE}/${lists}?language=${language}&page=${page}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TMDB.ACCESS_TOKEN}`
        }
      }
    );
    return { body, statusCode };
  }

  public async searchMovies(queries: SearchMovieQueriesDto) {
    const { body, statusCode } = await request(
      `${TMDB.URL}/search/${TMDB.TYPE.MOVIE}
      ?query=${queries.title}
      &include_adult=${queries.includeAdult}
      &language=${queries.language}
      &page=${queries.page}
      &region=${queries.region}
      &primary_release_year=${queries.primaryReleaseYear}
      &year=${queries.year}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TMDB.ACCESS_TOKEN}`
        }
      }
    );
    return { body, statusCode };
  }
}
