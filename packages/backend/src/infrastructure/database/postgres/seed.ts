import { postgresOptions } from 'src/common/configs';
import Database from './index';

const db = new Database(postgresOptions);

(async () => {
  const query = db.sql`
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
          23/01/2023, 
          Drive, 
          Good, 
          16/09/2011, 
          1.40,
          USA,
          'Nicolas Winding Refn, Newton Thomas Sigel',
          'Action, Drama',
          R,
          English,
          15000000,
          81000000
        )
    `;
  await query.rows();
})();
