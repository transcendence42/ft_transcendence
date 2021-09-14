import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MatchService } from './match.service';
import { Match } from './entities/match.entity';
import { CreateMatchInput } from './dto/create-match.input';
import { UpdateMatchInput } from './dto/update-match.input';

const gameQueue = [];

@Resolver(() => Match)
export class MatchResolver {
  constructor(private readonly matchService: MatchService) {}

  @Mutation(() => Match)
  createMatch(@Args('createMatchInput') createMatchInput: CreateMatchInput) {
    return this.matchService.create(createMatchInput);
  }

  @Query(() => [Match], { name: 'match' })
  findAll() {
    return this.matchService.findAll();
  }

  @Query(() => Match, { name: 'match' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.matchService.findOne(id);
  }

  @Mutation(() => Match)
  gameQueue(@Args('gameQueue') createMatchInput: CreateMatchInput) {
    const userID = createMatchInput.userID;
    if (gameQueue.includes(userID)) {
      return;
    }
    gameQueue.push(userID);
    if (gameQueue.length <= 0) {
      return this.matchService.create(createMatchInput);
    }

    // 3명 이상일땐 작동안함.
    const player1 = gameQueue.shift();
    const player2 = gameQueue.shift();

    //uuid 생성
    const uuid = 1000;

    return { player1, player2, uuid, userID };
  }

  // @Mutation (()=>MAtch)
  // checkQueue(@Args('checkQueue'))

  @Mutation(() => Match)
  updateMatch(@Args('updateMatchInput') updateMatchInput: UpdateMatchInput) {
    return this.matchService.update(updateMatchInput.id, updateMatchInput);
  }

  @Mutation(() => Match)
  removeMatch(@Args('id', { type: () => Int }) id: number) {
    return this.matchService.remove(id);
  }
}
