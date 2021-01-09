import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LOGGER } from './commen/logger/logger.constants';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  app.useLogger(app.get(LOGGER));
  await app.listen(3000);
}
bootstrap();
