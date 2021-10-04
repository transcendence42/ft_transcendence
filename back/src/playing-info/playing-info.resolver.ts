import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { PlayingInfoService } from './playing-info.service';
import { PlayingInfo } from './entities/playing-info.entity';
import { CreatePlayingInfoInput } from './dto/create-playing-info.input';
import { UpdatePlayingInfoInput } from './dto/update-playing-info.input';
import { PubSubProvider } from '../pub-sub/pub-sub.provider';
import { GamesService } from 'src/games/games.service';
import { UpdateGameInput } from 'src/games/dto/update-game.input';
import { Game } from 'src/games/entities/game.entity';
import { forwardRef, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
// import { UsersService } from 'src/users/users.service';
// import { UpdateUserInput } from 'src/users/dto/update-user.input';

@Resolver(() => PlayingInfo)
export class PlayingInfoResolver {
  constructor(
    private readonly playingInfoService: PlayingInfoService,
    @Inject(forwardRef(() => GamesService))
    private readonly gamesService: GamesService,
    // private readonly usersService: UsersService,
    private readonly pubSubProvider: PubSubProvider,
  ) {}

  @Mutation(() => PlayingInfo)
  createPlayingInfo(@Args('createPlayingInfoInput') createPlayingInfoInput: CreatePlayingInfoInput) {
    return this.playingInfoService.create(createPlayingInfoInput);
  }

  // @Query(() => [PlayingInfo], { name: 'playingInfo' })
  // findAll() {
  //   return this.playingInfoService.findAll();
  // }

  @Query(() => PlayingInfo, { name: 'playingInfo' })
  findOne(@Args('uuid', { type: () => String }) uuid: string) {
    return this.playingInfoService.findOneByUuid(uuid);
  }

  // @Mutation(() => PlayingInfo)
  // removePlayingInfo(@Args('id', { type: () => Int }) id: number) {
  //   return this.playingInfoService.remove(id);
  // }

  checkfinish(player1Score: number, player2Score: number) {
    return player1Score >= 5 || player2Score >= 5;
  }

  async updateGameEntity(updatePlayingInfoInput: UpdatePlayingInfoInput): Promise<Game> {
    const updateGameInput: UpdateGameInput = {
      uuid: updatePlayingInfoInput.uuid,
      isPlaying: false,
      playerOneScore: updatePlayingInfoInput.player1Score,
      playerTwoScore: updatePlayingInfoInput.player2Score,
      finishedAt: new Date(),
      modifiedAt: new Date(),
    };
    return await this.gamesService.update(updateGameInput.uuid, updateGameInput);
  }

  // updateUserIsMatchedFalse(playerOneID: string, playerTwoID: string) {
  //   const updatePlayerOneInput: UpdateUserInput = {
  //     userID: playerOneID,
  //     nickname: null,
  //     twoFactorAuthSecret: null,
  //     avatar: null,
  //     ladderRating: null,
  //     totalWin: null,
  //     totalLose: null,
  //     userState: 'login',
  //     isMatched: 'notMatched',
  //     modifiedAt: new Date(),
  //   };
  //   const updatePlayerTwoInput: UpdateUserInput = {
  //     userID: playerTwoID,
  //     nickname: null,
  //     twoFactorAuthSecret: null,
  //     avatar: null,
  //     ladderRating: null,
  //     totalWin: null,
  //     totalLose: null,
  //     isMatched: 'notMatched',
  //     userState: 'login',
  //     modifiedAt: new Date(),
  //   };
  //   this.usersService.update(playerOneID, updatePlayerOneInput);
  //   this.usersService.update(playerTwoID, updatePlayerTwoInput);
  // }

  @Mutation(() => PlayingInfo)
  async updatePlayingInfo(@Args('playingInfoInput') updatePlayingInfoInput: UpdatePlayingInfoInput) {
    const playingInfo = await this.playingInfoService.update(updatePlayingInfoInput.uuid, {
      ...updatePlayingInfoInput,
    });
    console.log('updatePlayingInfo', playingInfo);
    if (this.checkfinish(playingInfo.player1Score, playingInfo.player2Score)) {
      const game = await this.updateGameEntity(playingInfo);
      // this.updateUserIsMatchedFalse(game.playerOneID, game.playerTwoID);
      return playingInfo;
    }
    this.pubSubProvider.getPubSub().publish('playingInfo', {
      playingInfo: {
        ...playingInfo,
      },
    });
    return playingInfo;
  }

  async updateBall(uuid: string) {
    const updatePlayingInfo = await this.playingInfoService.update(uuid, null);
    this.pubSubProvider.getPubSub().publish('playingInfo', {
      playingInfo: updatePlayingInfo,
    });
  }

  // @Mutation(() => PlayingInfo)
  // async gameStart(@Args('playingInfoInput') updatePlayingInfoInput: UpdatePlayingInfoInput) {
  //   setInterval(() => this.updateBall(), 50);
  // }

  @Subscription(() => PlayingInfo, {
    filter: (payload, variables) => {
      return payload.playingInfo.uuid === variables.uuid;
    },
  })
  playingInfo(@Args('uuid') uuid: string) {
    console.log('subscription: ', uuid);
    setInterval(
      (uuid) => {
        this.updateBall(uuid);
      },
      100,
      uuid,
    );
    // setInterval(this.updateBall, 100, uuid);
    return this.pubSubProvider.getPubSub().asyncIterator('playingInfo');
  }
}
