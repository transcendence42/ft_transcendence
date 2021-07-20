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
import { DefaultAdminModule } from 'nestjs-admin';
import { FollowsModule } from './follows/follows.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
    }),
    TypeOrmModule.forRoot(),
    UsersModule,
    AlarmsModule,
    GamesModule,
    ChatsModule,
    ChatLogsModule,
    PubSubModule,
<<<<<<< HEAD
    DefaultAdminModule,
=======
    FollowsModule,
    AuthModule,
    PassportModule.register({ session: true }),
>>>>>>> 7281adf2770a2ea1e3b4afe97c8c1bf165154ca9
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
