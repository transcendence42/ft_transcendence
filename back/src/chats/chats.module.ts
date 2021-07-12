import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsResolver } from './chats.resolver';
import { ChatLogsModule } from 'src/chat-logs/chat-logs.module';

@Module({
  imports: [ChatLogsModule],
  providers: [ChatsResolver, ChatsService],
})
export class ChatsModule {}
