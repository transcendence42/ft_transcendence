import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GamesService } from './games.service';
import { Game } from './entities/game.entity';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { User } from 'src/users/entities/user.entity';
import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql.guard';
import { CurrentUser } from 'src/users/users.resolver';
import { UsersService } from 'src/users/users.service';
import { CreatePlayingInfoInput } from 'src/playing-info/dto/create-playing-info.input';
import { PlayingInfoService } from 'src/playing-info/playing-info.service';
import { string } from 'joi';

const gameQueue = [];

@Resolver(() => Game)
@UseGuards(GqlAuthGuard)
export class GamesResolver {
  constructor(
    private readonly gamesService: GamesService,
    private readonly usersService: UsersService,
    private readonly playingInfoService: PlayingInfoService,
  ) {}

  @Mutation(() => Game)
  createGame(@Args('createGameInput') createGameInput: CreateGameInput) {
    return this.gamesService.create(createGameInput);
  }

  @Query(() => [Game], { name: 'games' })
  findAll() {
    return this.gamesService.findAll();
  }

  @Query(() => [Game], { name: 'gameRecords' })
  findByUserID(@Args('userID', { type: () => String }) userID: string) {
    return this.gamesService.findEndGameByUserID(userID);
  }

  // not working
  @Query(() => [Game], { name: 'myGameRecords' })
  findMyGameRecords(@CurrentUser() user: User) {
    return this.gamesService.findByUserID(user.userID);
  }

  @Query(() => Game, { name: 'game' })
  findOne(@Args('index', { type: () => Int }) index: number) {
    return this.gamesService.findOne(index);
  }

  @Mutation(() => Game)
  updateGame(@Args('updateGameInput') updateGameInput: UpdateGameInput) {
    return this.gamesService.update(updateGameInput.uuid, updateGameInput);
  }

  @Mutation(() => Game)
  removeGame(@Args('index', { type: () => Int }) index: number) {
    return this.gamesService.remove(index);
  }

  @Mutation(() => Game, { nullable: true })
  async gameQueue(@Args('userID', { type: () => String }) userID: string) {
    // 1. ????????? ??????
    if (gameQueue.includes(userID)) {
      return null;
    }

    gameQueue.push(userID);
    // 2. ?????? ????????????
    // user isMatched??? waiting ?????? ?????????
    if (gameQueue.length <= 1) {
      this.usersService.updateIsMatched(userID, 'waiting');
      return null;
    }

    // 3. ?????? ????????????
    // 3??? ???????????? ????????????.
    // user isMatched??? matched??? ?????????
    const player1 = gameQueue.shift();
    const player2 = gameQueue.shift();
    // uuid ????????????
    const newGameInput: CreateGameInput = { playerOneID: player1, playerTwoID: player2 };
    const newGame = await this.gamesService.create(newGameInput);
    this.usersService.updateIsMatched(player1, 'matched');
    this.usersService.updateIsMatched(player2, 'matched');
    const createPlayingInfo: CreatePlayingInfoInput = { uuid: newGame.uuid };
    await this.playingInfoService.create(createPlayingInfo);
    return newGame;
  }

  @Mutation(() => Game, { nullable: true })
  async gameWithFriend(@Args('players', { type: () => CreateGameInput }) players: CreateGameInput) {
    // uuid ????????????
    const newGameInput: CreateGameInput = { playerOneID: players.playerOneID, playerTwoID: players.playerTwoID };
    const newGame = await this.gamesService.create(newGameInput);
    this.usersService.updateIsMatched(players.playerOneID, 'matched');
    this.usersService.updateIsMatched(players.playerTwoID, 'matched');
    const createPlayingInfo: CreatePlayingInfoInput = { uuid: newGame.uuid };
    await this.playingInfoService.create(createPlayingInfo);
    return newGame;
  }
}
// "ballX": 20,
// "ballY": 200,
// "player1Y": 350,
// "player2Y": 350,
// "player1Score": 0,
// "player2Score": 0,
// "ballVelocityY": 5,
// "ballVelocityX": 5,

// player 1 queue ????????????, [player1], user waiting: refetching
// player 2 queue ????????????, [player2], user waiting: refetching
// pubsub ?????? 'Keyword' ??????, ??????
// player 1 'Keyword' ????????? ?????? subscribe
// player 2 'Keyword' ????????? ?????? subscribe
