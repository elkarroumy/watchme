import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APP, CORS } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(APP.GLOBAL_PREFIX);
  app.enableCors({
    origin: [CORS.ORIGIN],
    methods: [CORS.METHODS],
    credentials: true
  });

  const config = new DocumentBuilder()
    .setTitle('Watchme')
    .setDescription('The watchme API details')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
