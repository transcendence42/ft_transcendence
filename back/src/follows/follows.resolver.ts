import { Resolver, Query, Mutation, Args, Int, ResolveField } from '@nestjs/graphql';
import { FollowsService } from './follows.service';
import { Follow } from './entities/follow.entity';
import { CreateFollowInput } from './dto/create-follow.input';
import { UpdateFollowInput } from './dto/update-follow.input';

@Resolver(() => Follow)
export class FollowsResolver {
  constructor(private readonly followsService: FollowsService) {}

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
  removeFollow(@Args('index', { type: () => Int }) index: number) {
    return this.followsService.remove(index);
  }
}
