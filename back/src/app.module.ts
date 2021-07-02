import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot(),
    UsersModule,
    GamesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
