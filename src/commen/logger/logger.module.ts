import { DynamicModule, Global, Module } from '@nestjs/common';
import { LoggerOptions } from 'winston';
import { createLoggerProvider } from './logger.provider';

@Global()
@Module({})
export class LoggerModule {
  public static forRoot(options: LoggerOptions): DynamicModule {
    const loggerProvider = createLoggerProvider(options);

    return {
      module: LoggerModule,
      providers: [loggerProvider],
      exports: [loggerProvider],
    };
  }
}
