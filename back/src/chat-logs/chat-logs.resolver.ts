import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChatLogsService } from './chat-logs.service';
import { ChatLog } from './entities/chat-log.entity';
import { CreateChatLogInput } from './dto/create-chat-log.input';
import { UpdateChatLogInput } from './dto/update-chat-log.input';

@Resolver(() => ChatLog)
export class ChatLogsResolver {
  constructor(private readonly chatLogsService: ChatLogsService) {}

  @Mutation(() => ChatLog)
  createChatLog(@Args('createChatLogInput') createChatLogInput: CreateChatLogInput) {
    return this.chatLogsService.create(createChatLogInput);
  }

  @Query(() => [ChatLog], { name: 'chatLogs' })
  findAll() {
    return this.chatLogsService.findAll();
  }

  @Query(() => ChatLog, { name: 'chatLog' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.chatLogsService.findOne(id);
  }

  @Mutation(() => ChatLog)
  updateChatLog(@Args('updateChatLogInput') updateChatLogInput: UpdateChatLogInput) {
    return this.chatLogsService.update(updateChatLogInput.id, updateChatLogInput);
  }

  @Mutation(() => ChatLog)
  removeChatLog(@Args('id', { type: () => Int }) id: number) {
    return this.chatLogsService.remove(id);
  }
}
