import { POSTGRES, REDIS } from '../constants/constants';

export const postgresOptions = {
  host: POSTGRES.HOSTNAME,
  port: POSTGRES.PORT,
  database: POSTGRES.DATABASE,
  user: POSTGRES.USERNAME,
  password: POSTGRES.PASSWORD
};

export const redisOptions = {
  host: REDIS.HOST,
  port: REDIS.PORT,
  username: REDIS.USERNAME,
  password: REDIS.PASSWORD
};