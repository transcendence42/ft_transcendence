import { Resolver, Query, Mutation, Args, GqlExecutionContext, ResolveField, Parent } from '@nestjs/graphql';
import { Inject, createParamDecorator, ExecutionContext, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { GqlAuthGuard } from 'src/auth/guards/gql.guard';
import { AuthenticationProvider } from 'src/auth/auth';
import { AlarmsService } from 'src/alarms/alarms.service';
import { Alarm } from 'src/alarms/entities/alarm.entity';
import { FollowsService } from 'src/follows/follows.service';

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req.user;
});

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthenticationProvider,
    private readonly usersService: UsersService,
    private readonly alarmsService: AlarmsService,
    private readonly followsService: FollowsService,
  ) {}

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

  @Query(() => User, { name: 'me' })
  async findMe(@CurrentUser() user: User) {
    return this.usersService.findOne(user.userID);
  }

  @Query(() => [Alarm], { name: 'myAlarm' })
  async findMyAlarm(@CurrentUser() user: User) {
    return this.alarmsService.findUserAlarm(user.userID);
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
