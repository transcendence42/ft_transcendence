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
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      cors: {
        credentials: true,
        origin: ['http://localhost:3000'],
      },
    }),
    TypeOrmModule.forRoot(),
    UsersModule,
    AlarmsModule,
    GamesModule,
    ChatsModule,
    ChatLogsModule,
    PubSubModule,
    AuthModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
