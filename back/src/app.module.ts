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

adminBro.registerAdapter({ Database, Resource });
const adminUserInfo = {
  email: 'admin@admin.com',
  password: 'admin',
};

@Module({
  imports: [
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
          if (adminUserInfo.email === email && adminUserInfo.password === password) {
            return adminUserInfo;
          }
          return null;
        },
        cookiePassword: 'some-secret-password-used-to-secure-cookie',
        cookieName: 'delicious-cookie',
      },
    }),
    TypeOrmModule.forRoot(),
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
