import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { PlayingInfoService } from './playing-info.service';
import { PlayingInfo } from './entities/playing-info.entity';
import { CreatePlayingInfoInput } from './dto/create-playing-info.input';
import { UpdatePlayingInfoInput } from './dto/update-playing-info.input';
import { PubSubProvider } from '../pub-sub/pub-sub.provider';

const data = {
  canvas: {
    height: 800,
    width: 900,
  },
  ball: {
    x: 450,
    y: 400,
    velocityX: 5,
    velocityY: 5,
    radius: 10,
    speed: 30,
    color: 'white',
  },
  player1: {
    x: 0,
    y: 200,
    paddleWidth: 10,
    paddleHeight: 150,
    color: 'white',
    score: 0,
  },
  player2: {
    x: 890,
    y: 200,
    paddleWidth: 10,
    paddleHeight: 150,
    color: 'white',
    score: 0,
  },
};

@Resolver(() => PlayingInfo)
export class PlayingInfoResolver {
  constructor(
    private readonly playingInfoService: PlayingInfoService,
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

  // @Query(() => PlayingInfo, { name: 'playingInfo' })
  // findOne(@Args('index', { type: () => Int }) index: number) {
  //   return this.playingInfoService.findOne(index);
  // }

  // @Mutation(() => PlayingInfo)
  // removePlayingInfo(@Args('id', { type: () => Int }) id: number) {
  //   return this.playingInfoService.remove(id);
  // }

  @Mutation(() => PlayingInfo)
  async updatePlayingInfo(@Args('playingInfoInput') updatePlayingInfoInput: UpdatePlayingInfoInput) {
    const playingInfo = await this.playingInfoService.update(updatePlayingInfoInput.index, {
      ...updatePlayingInfoInput,
      ballX: updatePlayingInfoInput.ballX + updatePlayingInfoInput.ballVelocityX,
      ballY: updatePlayingInfoInput.ballY + updatePlayingInfoInput.ballVelocityY,
      ballVelocityX: updatePlayingInfoInput.ballVelocityX,
      ballVelocityY: updatePlayingInfoInput.ballVelocityY,
    });
    this.pubSubProvider.getPubSub().publish('playingInfo', {
      playingInfo: {
        ...playingInfo,
      },
    });
    return playingInfo;
  }

  collision(playingInfo) {
    const { ballX, ballY, player1Y, player2Y, ballVelocityX, ballVelocityY } = playingInfo;

    if (ballY - data.ball.radius < 0 || ballY + data.ball.radius > data.canvas.height) {
      return { ...playingInfo, ballVelocityY: (playingInfo.ballVelocityY *= -1) };
    }

    // player1 paddle collision
    if (ballX - data.ball.radius <= 0) {
      if (player1Y + data.player1.paddleHeight >= ballY && player1Y <= ballY) {
        return { ...playingInfo, ballVelocityX: (playingInfo.ballVelocityX *= -1) };
      } else {
        return {
          ...playingInfo,
          player2Score: (playingInfo.player2Score += 1),
          ballX: data.canvas.width / 2 - ballVelocityX,
          ballY: data.canvas.height / 2 - ballVelocityY,
          // gameStatus: 'end',
        };
      }
    }

    // player2 paddle collision
    if (ballX + data.ball.radius >= data.canvas.width) {
      if (player2Y + data.player2.paddleHeight >= ballY && player2Y <= ballY) {
        return { ...playingInfo, ballVelocityX: (playingInfo.ballVelocityX *= -1) };
      } else {
        return {
          ...playingInfo,
          player1Score: (playingInfo.player1Score += 1),
          ballX: data.canvas.width / 2 - ballVelocityX,
          ballY: data.canvas.height / 2 - ballVelocityY,
          // gameStatus: 'end',
        };
      }
    }
    return playingInfo;
  }

  async updateBall() {
    const playingInfo = this.collision(await this.playingInfoService.findOne(1));
    const updatePlayingInfo = await this.playingInfoService.update(1, {
      ...playingInfo,
      ballX: playingInfo.ballX + playingInfo.ballVelocityX,
      ballY: playingInfo.ballY + playingInfo.ballVelocityY,
      ballVelocityX: playingInfo.ballVelocityX,
      ballVelocityY: playingInfo.ballVelocityY,
    });
    this.pubSubProvider.getPubSub().publish('playingInfo', {
      playingInfo: updatePlayingInfo,
    });
  }

  // @Mutation(() => PlayingInfo)
  // async gameStart(@Args('playingInfoInput') updatePlayingInfoInput: UpdatePlayingInfoInput) {
  //   setInterval(() => this.updateBall(), 50);
  // }

  @Subscription((returns) => PlayingInfo, {
    filter: (payload, variables) => {
      return payload.playingInfo.uuid === variables.uuid;
    },
  })
  playingInfo(@Args('uuid') uuid: string) {
    setInterval(() => this.updateBall(), 100);
    return this.pubSubProvider.getPubSub().asyncIterator('playingInfo');
  }
}
