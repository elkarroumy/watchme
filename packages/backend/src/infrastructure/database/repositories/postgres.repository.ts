import { Movie } from '../../../core/repositories/dtos/movie.dto';
import { MovieRepository } from '../../../core/repositories/movie.repository';
import Database from '../postgres';

export default class PostgresRepository implements MovieRepository {
  public constructor(private readonly database: Database) {}

  public async create(data: Movie): Promise<any> {
    const query = this.database.sql`
      INSERT INTO "Movie" (
          addedAt, 
          title, 
          overview, 
          releaseDate, 
          time,
          country,
          authors, 
          genre, 
          ageRate, 
          originalLanguage, 
          budget, 
          revenue
      ) VALUES (
          ${data.addedAt}, 
          ${data.title}, 
          ${data.overview}, 
          ${data.releaseDate}, 
          ${data.time},
          ${data.country},
          ${data.authors},
          ${data.genre},
          ${data.ageRate},
          ${data.originalLanguage},
          ${data.budget},
          ${data.revenue}
        )
    `;
    return await query.rows();
  }
}
