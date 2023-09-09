import { TMDB } from '../common/constants/constants';
import { MovieParams } from '../core/repositories/dtos/movie.dto';
import { request } from 'undici';

export class MovieIntegration {
  public async getMovies({ lists, language, page }: MovieParams) {
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
}
