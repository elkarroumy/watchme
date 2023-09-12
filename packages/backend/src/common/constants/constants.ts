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
  HOSTNAME: process.env.POSTGRES_HOSTNAME,
  PORT: Number(process.env.POSTGRES_PORT),
  USERNAME: process.env.POSTGRES_USERNAME,
  PASSWORD: process.env.POSTGRES_PASSWORD,
  DATABASE: process.env.POSTGRES_DATABASE
};

export const REDIS = {
  HOST: process.env.REDIS_HOST,
  PORT: Number(process.env.REDIS_PORT),
  USERNAME: process.env.REDIS_USERNAME,
  PASSWORD: process.env.REDIS_PASSWORD,
  EXPIRE: 20,
};