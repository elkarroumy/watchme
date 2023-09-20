import { config } from 'dotenv';
config({ path: '../../.env'});

export const TMDB = {
  ACCESS_TOKEN: process.env.TMDB_ACCESS_TOKEN,
  URL: process.env.TMDB_URL,
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
  DATABASE: Number(process.env.REDIS_DATABASE),
  ACCESS: 'access',
  REFRESH: 'refresh',
  EXPIRE: 20
};

export const CORS = {
  ORIGIN: process.env.CORS_ORIGIN,
  METHODS: process.env.CORS_METHODS
};

export const APP = {
  GLOBAL_PREFIX: 'api'
};

export const JWT = {
  ACCESS_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_SECRET: process.env.REFRESH_TOKEN_SECRET
};

export const EXCEPTION = {
  USER_ALREADY_EXISTS: 'User already exists',
  USER_NOT_FOUND: 'User not found',
  PASSWORD_INCORRECT: 'Password is incorrect',
  ACCESS_DENIED: 'Access denied'
};
