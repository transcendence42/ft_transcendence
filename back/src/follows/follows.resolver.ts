import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { FollowsService } from './follows.service';
import { Follow } from './entities/follow.entity';
import { CreateFollowInput } from './dto/create-follow.input';
import { BlockInput, UpdateFollowInput } from './dto/update-follow.input';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Resolver(() => Follow)
export class FollowsResolver {
  constructor(private readonly followsService: FollowsService, private readonly usersService: UsersService) {}

  @Mutation(() => Follow)
  createFollow(@Args('createFollowInput') createFollowInput: CreateFollowInput) {
    return this.followsService.create(createFollowInput);
  }

  @Query(() => [Follow], { name: 'follows' })
  findAll() {
    return this.followsService.findAll();
  }

  @Query(() => Follow, { name: 'follow' })
  findOne(@Args('index', { type: () => Int }) index: number) {
    return this.followsService.findOne(index);
  }

  @Mutation(() => Follow)
  updateFollow(@Args('updateFollowInput') updateFollowInput: UpdateFollowInput) {
    return this.followsService.update(updateFollowInput.index, updateFollowInput);
  }

  @Mutation(() => Follow)
  toggleBlock(@Args('blockInput', { type: () => BlockInput }) blockInput: BlockInput) {
    return this.followsService.toggleBlock(blockInput);
  }

  @Mutation(() => Follow)
  removeFollow(@Args('index', { type: () => Int }) index: number) {
    return this.followsService.remove(index);
  }
}
