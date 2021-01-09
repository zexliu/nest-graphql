import { Provider } from '@nestjs/common';
import { LoggerOptions, createLogger } from 'winston';
import { Logger } from './logger.classes';
import { LOGGER } from './logger.constants';

export function createLoggerProvider(loggerOpts: LoggerOptions): Provider {
  return {
    provide: LOGGER,
    useFactory: () => {
      return new Logger(createLogger(loggerOpts));
    },
  };
}
