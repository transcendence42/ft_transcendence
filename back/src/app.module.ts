import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AlarmsModule } from './alarms/alarms.module';
import { GamesModule } from './games/games.module';
import { ChatsModule } from './chats/chats.module';
import { ChatLogsModule } from './chat-logs/chat-logs.module';
import { PubSubModule } from './pub-sub/pub-sub.module';
import { FollowsModule } from './follows/follows.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from '@admin-bro/nestjs';
import { User } from './users/entities/user.entity';
import adminBro from 'admin-bro';
import { Database, Resource } from 'admin-bro-typeorm';
import { Alarm } from './alarms/entities/alarm.entity';
import { Chat } from './chats/entities/chat.entity';
import { Game } from './games/entities/game.entity';
import { ChatLog } from './chat-logs/entities/chat-log.entity';
import { Follow } from './follows/entities/follow.entity';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

adminBro.registerAdapter({ Database, Resource });

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
    }),
    AdminModule.createAdmin({
      adminBroOptions: {
        resources: [User, Game, Alarm, Chat, ChatLog, Follow],
        rootPath: '/admin',
      },
      auth: {
        authenticate: async (email, password) => {
          if (process.env.ADMIN_EMAIL === email && process.env.ADMIN_PASSWORD === password) {
            return { email: email, password: password };
          }
          return null;
        },
        cookiePassword: process.env.ADMIN_COOKIE_PASSWORD,
        cookieName: process.env.ADMIN_COOKIE_NAME,
      },
    }),
    UsersModule,
    AlarmsModule,
    GamesModule,
    ChatsModule,
    ChatLogsModule,
    PubSubModule,
    FollowsModule,
    AuthModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
