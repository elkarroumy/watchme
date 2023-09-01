import { TMDB } from 'src/common/constants/constants';
import { MovieLists } from 'src/common/types/types';
import { request } from 'undici';

export class MovieIntegration {
  public async getMovies(lists: MovieLists, language: string, page: number) {
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
