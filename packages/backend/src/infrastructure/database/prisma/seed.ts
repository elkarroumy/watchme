import { createReadStream, createWriteStream } from 'fs';
import { faker } from '@faker-js/faker';
import { parse } from 'csv';
import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { argv } from 'process';

const prisma = new PrismaClient();

const moviesData = () => {
  return {
    id: faker.string.uuid(),
    addedAt: faker.date.anytime(),
    title: faker.word.noun(),
    overview: faker.lorem.sentence(3),
    releaseDate: faker.date.anytime(),
    runtime: faker.number.float({ min: 1 }),
    country: faker.location.country(),
    authors: faker.person.fullName(),
    genre: faker.lorem.word(),
    ageRate: faker.number.int({ min: 1, max: 1000000 }),
    originalLanguage: faker.lorem.word(),
    budget: faker.number.bigInt(),
    revenue: faker.number.bigInt()
  };
};

const output = './seed.csv';
const stream = createWriteStream(output);

const writeToCsvFile = async () => {
  const rows = argv['rows'] ?? 10;

  for (let index = 0; index < rows; index++) {
    stream.write(`${Object.values(moviesData()).join(', ')}\n`, 'utf-8');
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
    .on('end', () => {
      prisma.movie
        .create({
          data: moviesData()
        })
        .then(() => {
          Logger.log('[SEED] Successfully created movie records');
        })
        .catch((error) => {
          Logger.log('[SEED] Failed to create movie records', error);
        });
    });
};

const seed = async () => {
  await writeToCsvFile();
  const stream = createReadStream(output);
  stream.pipe(await insertFromCsv());
};

seed();
