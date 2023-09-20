import { REDIS } from '../constants';

export const redisOptions = {
  port: REDIS.PORT,
  host: REDIS.HOST,
  username: REDIS.USERNAME,
  password: REDIS.PASSWORD,
  db: REDIS.DATABASE
};
