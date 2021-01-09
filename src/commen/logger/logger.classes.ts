import { Logger as NestLogger } from '@nestjs/common';
import { Logger as WinstonLogger } from 'winston';

export class Logger extends NestLogger {
  constructor(
    private readonly logger: WinstonLogger,
    context?: string,
    isTimestampEnabled?: boolean,
  ) {
    super(context, isTimestampEnabled);
  }

  public log(message: any, context?: string): any {
    context = context || this.context;

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.info(msg as string, { context, ...meta });
    }

    return this.logger.info(message, { context });
  }

  public logf(message: string, ...meta: any[]): any {
    const context = this.context;
    return this.logger.info(message as string, ...meta, { context });
  }

  public error(message: any, trace?: string, context?: string): any {
    context = context || this.context;

    if (message instanceof Error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { message: msg, name, stack, ...meta } = message;

      return this.logger.error(msg, {
        context,
        stack: [trace || message.stack],
        ...meta,
      });
    }

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.error(msg as string, {
        context,
        stack: [trace],
        ...meta,
      });
    }

    return this.logger.error(message, { context, stack: [trace] });
  }
  public errorf(message: string, ...meta: any[]): any {
    const context = this.context;
    return this.logger.error(message as string, ...meta, { context });
  }

  public warn(message: any, context?: string): any {
    context = context || this.context;

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.warn(msg as string, { context, ...meta });
    }

    return this.logger.warn(message, { context });
  }
  public warnf(message: string, ...meta: any[]): any {
    const context = this.context;
    return this.logger.warn(message as string, ...meta, { context });
  }
  public debug(message: any, context?: string): any {
    context = context || this.context;

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.debug(msg as string, { context, ...meta });
    }

    return this.logger.debug(message, { context });
  }

  public debugf(message: string, ...meta: any[]): any {
    const context = this.context;
    return this.logger.debug(message as string, ...meta, { context });
  }

  public verbose(message: any, context?: string): any {
    context = context || this.context;

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.verbose(msg as string, { context, ...meta });
    }

    return this.logger.verbose(message, { context });
  }

  public verbosef(message: string, ...meta: any[]): any {
    const context = this.context;
    return this.logger.verbose(message as string, ...meta, { context });
  }
}
