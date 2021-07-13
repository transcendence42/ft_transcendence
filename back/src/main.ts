import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors({
    origin: 'http://127.0.0.1:3000',
    credentials: true,
  });
  await app.listen(process.env.PORT || 5500);
}
bootstrap();
