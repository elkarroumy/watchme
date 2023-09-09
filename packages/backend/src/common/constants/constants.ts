import * as dotenv from 'dotenv';
dotenv.config();

export const TMDB = {
  ACCESS_TOKEN: process.env.TMDB_ACCESS_TOKEN,
  URL: process.env.TMDB_URL,
  TYPE: {
    MOVIE: 'movie'
  }
};

export const POSTGRES = {
  PORT: Number(process.env.POSTGRES_PORT),
  HOSTNAME: process.env.POSTGRES_HOSTNAME,
  USERNAME: process.env.POSTGRES_USERNAME,
  PASSWORD: process.env.POSTGRES_PASSWORD,
  DATABASE: process.env.POSTGRES_DATABASE
};
