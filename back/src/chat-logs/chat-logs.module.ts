import { Module } from '@nestjs/common';
import { ChatLogsService } from './chat-logs.service';
import { ChatLogsResolver } from './chat-logs.resolver';

@Module({
  providers: [ChatLogsResolver, ChatLogsService],
  exports: [ChatLogsService],
})
export class ChatLogsModule {}
