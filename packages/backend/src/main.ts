import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/app.module';
import { APP, CORS } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(APP.GLOBAL_PREFIX);
  app.enableCors({
    origin: [CORS.ORIGIN],
    methods: [CORS.METHODS],
    credentials: true
  });
  await app.listen(3000);
}

bootstrap();
