import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChatsService } from './chats.service';
import { Chat } from './entities/chat.entity';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';

@Resolver(() => Chat)
export class ChatsResolver {
  constructor(private readonly chatsService: ChatsService) {}

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
  findAliveMyChats(
    @Args('userID', { type: () => String, nullable: true }) userID: string,
    @Args('type', { type: () => String, nullable: true }) type: string,
    @Args('page', { type: () => Int, nullable: true }) page: number,
    @Args('pageSize', { type: () => Int, nullable: true }) pageSize: number,
  ) {
    return this.chatsService.findAliveChats({ userID, type, page, pageSize });
  }
}
