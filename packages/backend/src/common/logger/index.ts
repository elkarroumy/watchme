import winston from 'winston';

export const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      level: 'warn',
      filename: 'logs/warn.log'
    }),
    new winston.transports.File({
      level: 'debug',
      filename: 'logs/debug.log'
    }),
    new winston.transports.File({
      level: 'error',
      filename: 'logs/error.log'
    })
  ]
});
