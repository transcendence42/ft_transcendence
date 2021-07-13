import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FollowService } from './follow.service';
import { Follow } from './entities/follow.entity';
import { CreateFollowInput } from './dto/create-follow.input';
import { UpdateFollowInput } from './dto/update-follow.input';

@Resolver(() => Follow)
export class FollowResolver {
  constructor(private readonly followService: FollowService) {}

  @Mutation(() => Follow)
  createFollow(@Args('createFollowInput') createFollowInput: CreateFollowInput) {
    return this.followService.create(createFollowInput);
  }

  @Query(() => [Follow], { name: 'follow' })
  findAll() {
    return this.followService.findAll();
  }

  @Query(() => Follow, { name: 'follow' })
  findOne(@Args('index', { type: () => Int }) index: number) {
    return this.followService.findOne(index);
  }

  @Mutation(() => Follow)
  updateFollow(@Args('updateFollowInput') updateFollowInput: UpdateFollowInput) {
    return this.followService.update(updateFollowInput.index, updateFollowInput);
  }

  @Mutation(() => Follow)
  removeFollow(@Args('index', { type: () => Int }) index: number) {
    return this.followService.remove(index);
  }
}
