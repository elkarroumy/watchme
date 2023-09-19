import { createLogger, Logger, transports } from 'winston';

export class AppLogger {
  private context?: string;
  private logger: Logger;

  public setContext(context: string): void {
    this.context = context;
  }

  public constructor() {
    this.logger = createLogger({
      transports: [new transports.Console()]
    });
  }

  public error(message: string, meta?: Record<string, any>): Logger {
    const timestamp = new Date().toISOString();

    return this.logger.error({
      message,
      contextName: this.context,
      timestamp,
      ...meta
    });
  }

  public warn(message: string, meta?: Record<string, any>): Logger {
    const timestamp = new Date().toISOString();

    return this.logger.warn({
      message,
      contextName: this.context,
      timestamp,
      ...meta
    });
  }

  public debug(message: string, meta?: Record<string, any>): Logger {
    const timestamp = new Date().toISOString();

    return this.logger.debug({
      message,
      contextName: this.context,
      timestamp,
      ...meta
    });
  }

  public verbose(message: string, meta?: Record<string, any>): Logger {
    const timestamp = new Date().toISOString();

    return this.logger.verbose({
      message,
      contextName: this.context,
      timestamp,
      ...meta
    });
  }

  public log(message: string, meta?: Record<string, any>): Logger {
    const timestamp = new Date().toISOString();

    return this.logger.info({
      message,
      contextName: this.context,
      timestamp,
      ...meta
    });
  }
}