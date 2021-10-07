import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { CreatePlayingInfoInput } from './dto/create-playing-info.input';
import { UpdatePlayingInfoInput } from './dto/update-playing-info.input';
import { PlayingInfo } from './entities/playing-info.entity';

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
@Injectable()
export class PlayingInfoService {
  async create(createPlayingInfoInput: CreatePlayingInfoInput) {
    const playingInfo = new PlayingInfo();
    playingInfo.uuid = createPlayingInfoInput.uuid;
    playingInfo.ballX = createPlayingInfoInput.ballX;
    playingInfo.ballY = createPlayingInfoInput.ballY;
    playingInfo.ballVelocityX = createPlayingInfoInput.ballVelocityX;
    playingInfo.ballVelocityY = createPlayingInfoInput.ballVelocityY;
    playingInfo.player1Y = createPlayingInfoInput.player1Y;
    playingInfo.player2Y = createPlayingInfoInput.player2Y;

    const validate_error = await validate(playingInfo);
    if (validate_error.length > 0) {
      const _error = { playingInfo: 'PlayingInfo Input is not valid' };
      throw new HttpException({ message: 'PlayingInfo Input validation failed', _error }, HttpStatus.BAD_REQUEST);
    } else {
      return await PlayingInfo.save(playingInfo);
    }
  }

  findAll() {
    return `This action returns all playingInfo`;
  }

  async findOne(index: number) {
    const playingInfo = await PlayingInfo.findOne(index);
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

  async update(index: number, updatePlayingInfoInput: UpdatePlayingInfoInput) {
    const playingInfo = await PlayingInfo.findOne(index);

    playingInfo.ballX = playingInfo.ballX + playingInfo.ballVelocityX;
    playingInfo.ballY = playingInfo.ballY + playingInfo.ballVelocityY;

    const collisionInfoInput = this.collision({
      ...playingInfo,
      ...updatePlayingInfoInput,
      ballX: playingInfo.ballX,
      ballY: playingInfo.ballY,
      sequence: playingInfo.sequence + 1,
    });

    const validate_error = await validate(collisionInfoInput);
    if (validate_error.length > 0) {
      const _error = { playingInfo: 'PlayingInfo Input is not valid' };
      throw new HttpException({ message: 'PlayingInfo Input validation failed', _error }, HttpStatus.BAD_REQUEST);
    } else {
      await PlayingInfo.save(collisionInfoInput);
      return collisionInfoInput;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} playingInfo`;
  }
}
