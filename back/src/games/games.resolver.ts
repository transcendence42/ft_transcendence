import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GamesService } from './games.service';
import { Game } from './entities/game.entity';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { User } from 'src/users/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql.guard';
import { CurrentUser } from 'src/users/users.resolver';

const gameQueue = [];

@Resolver(() => Game)
@UseGuards(GqlAuthGuard)
export class GamesResolver {
  constructor(private readonly gamesService: GamesService) {}

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
    return this.gamesService.findByUserID(userID);
  }

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
    return this.gamesService.update(updateGameInput.index, updateGameInput);
  }

  @Mutation(() => Game)
  removeGame(@Args('index', { type: () => Int }) index: number) {
    return this.gamesService.remove(index);
  }

  @Mutation(() => Game)
  async gameQueue(@Args('userID', { type: () => String }) userID: string) {
    console.log(userID);
    if (gameQueue.includes(userID)) {
      return;
    }
    gameQueue.push(userID);
    if (gameQueue.length <= 1) {
      return null;
    }

    // 3명 이상일땐 작동안함.
    const player1 = gameQueue.shift();
    const player2 = gameQueue.shift();
    const newGameInput: CreateGameInput = { playerOneID: player1, playerTwoID: player2 };
    const newGame = await this.gamesService.create(newGameInput);
    return newGame;
  }
}

// player 1 queue 집어넣음, [player1], user waiting: refetching
// player 2 queue 집어넣음, [player2], user waiting: refetching
// pubsub 채널 'Keyword' 생성, 발행
// player 1 'Keyword' 채널에 연결 subscribe
// player 2 'Keyword' 채널에 연결 subscribe
