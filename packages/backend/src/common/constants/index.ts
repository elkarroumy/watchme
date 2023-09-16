import * as dotenv from 'dotenv';
dotenv.config();

export const TMDB = {
  ACCESS_TOKEN: process.env.TMDB_ACCESS_TOKEN,
  URL: process.env.Tasd,
  TYPE: {
    MOVIE: 'movie',
    SIMILAR: 'similar'
  }
};

export const REDIS = {
  HOST: process.env.REDIS_HOST,
  PORT: Number(process.env.REDIS_PORT),
  USERNAME: process.env.REDIS_USERNAME,
  PASSWORD: process.env.REDIS_PASSWORD,
  EXPIRE: 20
};
