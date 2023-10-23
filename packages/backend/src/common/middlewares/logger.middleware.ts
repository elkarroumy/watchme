import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { AppLogger } from '../../helpers/logger';
import { NextFunction, Request, Response } from 'express';
import LogsRepository from '../../infrastructure/database/repositories/logs.repositories';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  public constructor(
    private readonly logger: AppLogger,
    private readonly logsRepository: LogsRepository
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const userAgent = req.get('user-agent');
    const timestamp = new Date().toISOString();

    this.logger.log(`Request: method: ${method}, path: ${originalUrl}`, {
      userAgent
    });

    res.on('finish', async () => {
      const { statusCode, statusMessage } = res;

      const message = `Response: ${statusCode} ${statusMessage}`;

      if (
        statusCode === HttpStatus.INTERNAL_SERVER_ERROR ||
        statusCode === HttpStatus.NOT_FOUND ||
        statusCode === HttpStatus.UNAUTHORIZED ||
        statusCode === HttpStatus.FORBIDDEN
      ) {
        this.logger.error(message, {
          userAgent
        });

        await this.logsRepository.create({
          level: 'error',
          timestamp,
          message: statusMessage,
          method: method,
          path: originalUrl,
          userAgent
        });
      } else {
        this.logger.log(message, {
          userAgent
        });
      }
    });

    next();
  }
}
