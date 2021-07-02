import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AlarmsModule } from './alarms/alarms.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
    }),
    TypeOrmModule.forRoot(),
    UsersModule,
    AlarmsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
