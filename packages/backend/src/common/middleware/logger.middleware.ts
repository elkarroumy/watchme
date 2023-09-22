import { Injectable, NestMiddleware } from '@nestjs/common';
import { AppLogger } from '../../helpers/logger';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  public constructor(private readonly logger: AppLogger) {}

  use(req: Request, _: Response, next: NextFunction) {
    this.logger.log(`method: ${req.method}, path: ${req.path}`);
    next();
  }
}
