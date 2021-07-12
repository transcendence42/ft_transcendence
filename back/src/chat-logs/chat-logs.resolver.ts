import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { ChatLogsService } from './chat-logs.service';
import { ChatLog } from './entities/chat-log.entity';
import { CreateChatLogInput } from './dto/create-chat-log.input';
import { UpdateChatLogInput } from './dto/update-chat-log.input';
import { PubSubProvider } from '../pub-sub/pub-sub.provider';

@Resolver(() => ChatLog)
export class ChatLogsResolver {
  constructor(private readonly chatLogsService: ChatLogsService, private readonly pubSubProvider: PubSubProvider) {}

  @Mutation(() => ChatLog)
  async createChatLog(@Args('createChatLogInput') createChatLogInput: CreateChatLogInput) {
    const newChatLog = await this.chatLogsService.create(createChatLogInput);
    this.pubSubProvider.getPubSub().publish('chatLogAdded', { chatLogAdded: newChatLog });
    return newChatLog;
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
  findChatLogsFromChat(@Args('uuid', { type: () => String }) uuid: string) {
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

  @Subscription((returns) => ChatLog, {
    filter: (payload, variables) => {
      return payload.chatLogAdded.userID === variables.userID;
    },
  })
  chatLogAdded(@Args('userID') userID: string) {
    return this.pubSubProvider.getPubSub().asyncIterator('chatLogAdded');
  }
}
