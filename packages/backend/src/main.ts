import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/app.module';
import { API, CORS } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(API.GLOBAL_PREFIX);
  app.enableCors({
    origin: [CORS.ORIGIN],
    methods: [CORS.METHODS],
    credentials: true
  });
  await app.listen(3000);
}

bootstrap();
