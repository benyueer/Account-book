import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get<ConfigService>(ConfigService);
  app.enableCors();
  await app.listen(appConfig.get('APP_PORT'));
}
bootstrap();
