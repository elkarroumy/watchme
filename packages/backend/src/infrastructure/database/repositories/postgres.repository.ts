import { Movie } from '../../../core/repositories/dtos/movie.dto';
import { PostgresRepository } from '../../../core/repositories/postgres.repository';
import Database from '../postgres';

export default class Postgres implements PostgresRepository {
  public constructor(private readonly database: Database) {}

  public async addMovie(data: Movie): Promise<string> {
    const query = await this.database.query(
      ` 
        INSERT INTO Movie (
              id, added_at, title, overview, release_date, time,
              country, authors, genre, age_rate,
              original_language, budget, revenue, review_id
              )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
      Object.values(data)
    );
    return query.rows[0];
  }

  public async deleteMovie(id: number): Promise<string[]> {
    const query = this.database.sql`DELETE FROM Movie WHERE id = ${id}`;
    return await query.rows();
  }

  public async getWatchList(): Promise<string[]> {
    const query = this.database.sql`SELECT * FROM Movie`;
    return await query.rows();
  }

  public async getMovieIdAndLanguage() {
    const query = this.database.sql`
        SELECT id, original_language
        FROM Movie
    `;
    return await query.rows();
  }
}
