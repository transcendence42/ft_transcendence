import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsResolver } from './chats.resolver';

@Module({
  providers: [ChatsResolver, ChatsService]
})
export class ChatsModule {}
