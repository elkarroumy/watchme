import { TMDB } from '../common/constants/constants';
import {
  ShowMovieParams,
  SearchMovieParams,
  MovieParams
} from '../core/repositories/dtos/movie.dto';
import { request } from 'undici';

export class MovieIntegration {
  public async getMovies({ lists, language, page }: ShowMovieParams) {
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

  public async searchMovies(params: SearchMovieParams) {
    const { body, statusCode } = await request(
      `${TMDB.URL}/search/${TMDB.TYPE.MOVIE}
      ?query=${params.title}
      &include_adult=${params.includeAdult}
      &language=${params.language}
      &page=${params.page}
      &region=${params.region}
      &primary_release_year=${params.primaryReleaseYear}
      &year=${params.year}`,
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

  public async getMostPopularMovies({ language, page, region }: MovieParams) {
    const { body, statusCode } = await request(
      `${TMDB.URL}/${TMDB.TYPE.MOVIE}/popular?language=${language}&page=${page}&region=${region}`,
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

  public async getTopRatedMovies({ language, page, region }: MovieParams) {
    const { body, statusCode } = await request(
      `${TMDB.URL}/${TMDB.TYPE.MOVIE}/top_rated?language=${language}&page=${page}&region=${region}`,
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

  public async getUpcomingReleases({ language, page, region }: MovieParams) {
    const { body, statusCode } = await request(
      `${TMDB.URL}/${TMDB.TYPE.MOVIE}/upcoming?language=${language}&page=${page}&region=${region}`,
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

  public async getSimilarMovieById(id: string, language = 'en-US', page: number) {
    const { body, statusCode } = await request(
      `${TMDB.URL}/${TMDB.TYPE.MOVIE}/${id}/similar?language=${language}&page=${page}`,
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
