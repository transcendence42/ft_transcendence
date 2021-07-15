import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { FollowsService } from 'src/follows/follows.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService, private readonly followsService: FollowsService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('userID', { type: () => String }) userID: string) {
    return this.usersService.findOne(userID);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.userID, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('userID', { type: () => String }) userID: string) {
    return this.usersService.remove(userID);
  }

  @ResolveField()
  async followers(@Parent() user: User) {
    const { index } = user;
    return this.followsService.findFollowers({ index: index });
  }

  @ResolveField()
  async followings(@Parent() user: User) {
    const { index } = user;
    return this.followsService.findFollowings({ index: index });
  }
}
