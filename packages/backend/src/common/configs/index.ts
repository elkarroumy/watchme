import { POSTGRES } from '../constants/constants';

export const postgresOptions = {
  host: POSTGRES.HOSTNAME,
  port: POSTGRES.PORT,
  database: POSTGRES.DATABASE,
  user: POSTGRES.USERNAME,
  password: POSTGRES.PASSWORD
};
