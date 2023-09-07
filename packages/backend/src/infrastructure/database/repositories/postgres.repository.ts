import { PrismaClient } from '@prisma/client';
import { MoviesDto } from 'src/core/repositories/dtos/movie.dto';
import { MovieRepository } from 'src/core/repositories/movie.repository';
import Database from '../postgres';

export default class PostgresRepository implements MovieRepository {
  public constructor(private readonly postgres: Database) {}

  public async create(data: MoviesDto): Promise<any> {
    const query = this.postgres.sql`
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
