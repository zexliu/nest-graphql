import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { LoggerModule } from './commen/logger/logger.module';
import * as winston from 'winston';
import { loggerFormat } from './commen/logger/logger.format';
import { MongooseModule } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';
import { CoreModule } from './core/core.module';
Mongoose.set('debug', true);
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:root@localhost:27017/test?authSource=admin',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      },
    ),
    LoggerModule.forRoot({
      level: 'debug',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.splat(),
            winston.format.simple(),
            winston.format.timestamp(),
            loggerFormat(),
          ),
        }),
      ],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      debug: true,
      playground: true,
    }),
    LoggerModule,
    CoreModule,
  ],
})
export class AppModule {}
