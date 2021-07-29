import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ChatsService } from './chats.service';
import { Chat } from './entities/chat.entity';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { ChatLog } from 'src/chat-logs/entities/chat-log.entity';
import { ChatLogsService } from 'src/chat-logs/chat-logs.service';

@Resolver(() => Chat)
export class ChatsResolver {
  constructor(private readonly chatsService: ChatsService, private readonly chatLogsService: ChatLogsService) {}

  @Mutation(() => Chat)
  createChat(@Args('createChatInput') createChatInput: CreateChatInput) {
    return this.chatsService.create(createChatInput);
  }

  @Query(() => [Chat], { name: 'chats' })
  findAll() {
    return this.chatsService.findAll();
  }

  @Query(() => Chat, { name: 'chat' })
  findOne(@Args('uuid', { type: () => String }) uuid: string) {
    return this.chatsService.findOne(uuid);
  }

  @Mutation(() => Chat)
  updateChat(@Args('updateChatInput') updateChatInput: UpdateChatInput) {
    return this.chatsService.update(updateChatInput.uuid, updateChatInput);
  }

  @Mutation(() => Chat)
  removeChat(@Args('uuid', { type: () => String }) uuid: string) {
    return this.chatsService.remove(uuid);
  }

  @Query(() => Int)
  getChatCount(
    @Args('type', { type: () => String, nullable: true }) type: string,
    @Args('userID', { type: () => String, nullable: true }) userID: string,
  ) {
    return this.chatsService.getCount({ type, userID });
  }

  @Query(() => [Chat], { name: 'aliveChats' })
  findAliveChats(
    @Args('userID', { type: () => String, nullable: true }) userID: string,
    @Args('type', { type: () => String, nullable: true }) type: string,
    @Args('page', { type: () => Int, nullable: true }) page: number,
    @Args('pageSize', { type: () => Int, nullable: true }) pageSize: number,
  ) {
    return this.chatsService.findAliveChats({ userID, type, page, pageSize });
  }

  @ResolveField(() => [ChatLog])
  chatLog(@Parent() chat: Chat) {
    return this.chatLogsService.findChatLogsFromChat(chat.uuid);
  }

  @Query(() => Boolean, { name: 'checkChatPassword' })
  checkPassword(
    @Args('uuid', { type: () => String }) uuid: string,
    @Args('password', { type: () => String }) password: string,
  ) {
    return this.chatsService.checkPassword(uuid, password);
  }

  @Mutation(() => Chat)
  toggleMute(
    @Args('uuid', { type: () => String }) uuid: string,
    @Args('userID', { type: () => String }) userID: string,
  ) {
    return this.chatsService.toggleMute(uuid, userID);
  }

  @Mutation(() => Chat)
  forcedOut(
    @Args('uuid', { type: () => String }) uuid: string,
    @Args('userID', { type: () => String }) userID: string,
  ) {
    return this.chatsService.forcedOut(uuid, userID);
  }

  @Mutation(() => Chat)
  toggleAdmin(
    @Args('uuid', { type: () => String }) uuid: string,
    @Args('userID', { type: () => String }) userID: string,
  ) {
    return this.chatsService.toggleAdmin(uuid, userID);
  }
}
