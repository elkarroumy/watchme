import { Movie } from '../../../core/repositories/dtos/movie.dto';
import { MovieRepository } from '../../../core/repositories/movie.repository';
import Database from '../postgres';

export default class PostgresRepository implements MovieRepository {
  public constructor(private readonly database: Database) {}

  public async addMovie(data: Movie) {
    const query = await this.database.query(
      `     INSERT INTO Movie (
                id, added_at, title, overview, release_date, time,
                country, authors, genre, age_rate,
                original_language, budget, revenue, review_id
              )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
      Object.values(data)
    );
    return query.rows[0];
  }
}
