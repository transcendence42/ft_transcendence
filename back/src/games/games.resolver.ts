import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GamesService } from './games.service';
import { Game } from './entities/game.entity';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { User } from 'src/users/entities/user.entity';
import { CurrentUser } from 'src/users/users.resolver';

@Resolver(() => Game)
export class GamesResolver {
  constructor(private readonly gamesService: GamesService) { }

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
    // console.log(user.userID);
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
}
