import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:4200',
      methods: 'GET, POST, PUT, DELETE',
    },
  });

  app.use(compression());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: false,
    }),
  );

  app.setGlobalPrefix('api', { exclude: [''] });

  await app.listen(process.env.SERVER_PORT);
}

bootstrap();
