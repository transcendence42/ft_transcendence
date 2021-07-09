import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use(
    session({
      cookie: {
        maxAge: 60000 * 60 * 24, // 24hours
      },
      secret: 'pingpongcrazypongajslkdjflkasjw',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );
  await app.listen(process.env.PORT || 5500);
}
bootstrap();
