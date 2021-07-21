import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import { setupAdminPanel } from './admin-panel/admin-panel.plugin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await setupAdminPanel(app);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(process.env.PORT || 5500);
}
bootstrap();
