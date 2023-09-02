import { TMDB } from 'src/common/constants/constants';
import { MoviesParamsDto } from 'src/core/repositories/dtos/movie.dto';
import { request } from 'undici';

export class MovieIntegration {
  public async getMovies({ lists, language, page }: MoviesParamsDto) {
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
