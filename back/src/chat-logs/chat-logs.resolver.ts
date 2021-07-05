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
  findOne(@Args('index', { type: () => Int }) index: number) {
    return this.chatLogsService.findOne(index);
  }

  @Query(() => [ChatLog], { name: 'chatLogsFromChat' })
  findChatLogsFromChat(@Args('uuid') uuid: string) {
    return this.chatLogsService.findChatLogsFromChat(uuid);
  }

  @Mutation(() => ChatLog)
  updateChatLog(@Args('updateChatLogInput') updateChatLogInput: UpdateChatLogInput) {
    return this.chatLogsService.update(updateChatLogInput.index, updateChatLogInput);
  }

  @Mutation(() => ChatLog)
  removeChatLog(@Args('index', { type: () => Int }) index: number) {
    return this.chatLogsService.remove(index);
  }
}
