import { Resolver, Query, Mutation, Args, GqlExecutionContext, ResolveField, Parent, Int } from '@nestjs/graphql';
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
import { createWriteStream } from 'fs';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

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

  // mutation이 아닌 query 라서 안에서 setTwoFactorAuthSecret
  @Query(() => String)
  async getOtpAuthUrl(@CurrentUser() user: User) {
    const otpAuthUrl = await this.authService.generateTwoFactorAuthSecret(user);
    return otpAuthUrl;
  }

  @Mutation(() => Boolean)
  async toggleTwoFactorAuthentication(
    @CurrentUser() user: User,
    // @Args('twoFactorAuthCode', { type: () => String }) twoFactorAuthCode: string,
  ) {
    // const secret = (await this.usersService.findOneByUserID(user.userID)).twoFactorAuthSecret;
    // const isCodeValid = this.authService.isTwoFactorAuthCodeValid(twoFactorAuthCode, secret);
    // if (!isCodeValid) {
    //   throw new UnauthorizedException('Wrong authentication code');
    // }
    const result = await this.usersService.toggleTwoFactorAuthentication(user.userID).catch(() => {
      console.log('error: toggleTwoFactorAuthentication');
      return false;
    });
    return result;
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOneByUserID(@Args('userID', { type: () => String }) userID: string) {
    return this.usersService.findOneByUserID(userID);
  }

  @Query(() => User, { name: 'userByIndex' })
  findOne(@Args('index', { type: () => Int }) index: number) {
    return this.usersService.findOne(index);
  }

  @Query(() => User, { name: 'me' })
  async findMe(@CurrentUser() user: User) {
    return this.usersService.findOneByUserID(user.userID);
  }

  @Query(() => Int)
  getLadderRanking(@Args('userID', { type: () => String }) userID: string) {
    return this.usersService.calculateLadderRanking(userID);
  }

  @Query(() => Int)
  getMyLadderRanking(@CurrentUser() user: User) {
    return this.usersService.calculateLadderRanking(user.userID);
  }

  @Query(() => [Alarm], { name: 'myAlarm' })
  async findMyAlarm(@CurrentUser() user: User) {
    return this.alarmsService.findUserAlarm(user.userID);
  }

  @Query(() => [User], { name: 'friends' })
  async findFriends(@Args('userID', { type: () => String, nullable: true }) userID: string) {
    const user = await this.findOneByUserID(userID);
    const usersIndex = (await this.followsService.findFriends(user.index)).map((x) => x['followingIndex']);
    const users = usersIndex.map(async (x) => {
      return await this.usersService.findOne(x);
    });
    return users;
  }

  @Query(() => [User], { name: 'myFriends' })
  async findMyFriends(@CurrentUser() user: User) {
    const usersIndex = (await this.followsService.findFriends(user.index)).map((x) => x['followingIndex']);
    const users = await Promise.all(
      usersIndex.map((x) => {
        return this.usersService.findOne(x);
      }),
    );
    return users;
  }

  @Query(() => [User], { name: 'blockedUsers' })
  async findBlockedUsers(@Args('userID', { type: () => String }) userID: string) {
    const user = await this.usersService.findOneByUserID(userID);
    const blockedUsersIndex = (await this.followsService.findBlockedUsers(user.index)).map((x) => x['followingIndex']);
    const blockedUsers = await Promise.all(
      blockedUsersIndex.map((x) => {
        return this.usersService.findOne(x);
      }),
    );
    return blockedUsers;
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.userID, updateUserInput);
  }

  @Mutation(() => User)
  updateAvatar(@CurrentUser() user: User, @Args('avatar') avatar: string) {
    return this.usersService.updateAvatar(user.userID, avatar);
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

  @Mutation(() => String)
  async uploadFile(
    @CurrentUser() user: User,
    @Args('file', { type: () => GraphQLUpload })
    file: FileUpload,
  ): Promise<string> {
    const { createReadStream } = await file;
    const stream = createReadStream();
    return new Promise(async (resolve, reject) =>
      stream
        .pipe(createWriteStream(`./public/images/${user.userID}`))
        .on('finish', () => resolve(`/images/${user.userID}`))
        .on('error', () => reject('')),
    );
  }
}
