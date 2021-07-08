import { Resolver, Query, Mutation, Args, GqlExecutionContext } from '@nestjs/graphql';
import { Inject, createParamDecorator, ExecutionContext, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { GqlAuthGuard } from 'src/auth/guards/gql.guard';
import { AuthenticationProvider } from 'src/auth/auth';

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
  findOne(@CurrentUser() user: User, @Args('userID', { type: () => String }) userID: string) {
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
}
