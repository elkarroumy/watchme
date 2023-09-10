import { createReadStream, createWriteStream } from 'fs';
import { faker } from '@faker-js/faker';
import { postgresOptions } from '../../../common/configs';
import { argv } from 'process';
import { parse } from 'csv';
import Database from './index';
import { Logger } from '@nestjs/common';

const db = new Database(postgresOptions);

const movie = {
  id: faker.string.uuid(),
  addedAt: faker.date.anytime(),
  title: faker.word.noun(),
  overview: faker.lorem.sentence(3),
  releaseDate: faker.date.anytime(),
  time: faker.number.float({ min: 1 }),
  country: faker.location.country(),
  authors: faker.person.fullName(),
  genre: faker.lorem.word(),
  ageRate: faker.number.int({ min: 1, max: 1000000 }),
  originalLanguage: faker.lorem.word(),
  budget: faker.number.bigInt(),
  revenue: faker.number.bigInt(),
  reviewId: faker.number.int({ min: 1, max: 100 })
};

const values = Object.values(movie);

const output = './seed.csv';
const stream = createWriteStream(output);

const writeToCsvFile = async (rows: number) => {
  for (let index = 0; index < rows; index++) {
    stream.write(`${values.join(', ')}\n`, 'utf-8');
  }
  stream.end();
};

const insertFromCsv = async () => {
  let csvData = [];

  const parser = parse({
    relax_column_count: true
  });

  return parser
    .on('data', (data) => {
      csvData.push(data);
    })
    .on('end', async () => {
      try {
        await db.query(
          `     INSERT INTO Movie (
                id, added_at, title, overview, release_date, time,
                country, authors, genre, age_rate,
                original_language, budget, revenue, review_id
              )
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
          values
        );

        Logger.log('SQL seed completed!');
      } catch (error) {
        Logger.error(error);
      }
    });
};

const seed = async () => {
  const rows = argv['rows'] || 10;

  await writeToCsvFile(rows);
  const stream = createReadStream(output);
  stream.pipe(await insertFromCsv());
};

seed();
