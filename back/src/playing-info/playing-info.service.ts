import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { CreatePlayingInfoInput } from './dto/create-playing-info.input';
import { UpdatePlayingInfoInput } from './dto/update-playing-info.input';
import { PlayingInfo } from './entities/playing-info.entity';

@Injectable()
export class PlayingInfoService {
  async create(createPlayingInfoInput: CreatePlayingInfoInput) {
    const playingInfo = new PlayingInfo();
    playingInfo.uuid = createPlayingInfoInput.uuid;
    playingInfo.ballX = createPlayingInfoInput.ballX;
    playingInfo.ballY = createPlayingInfoInput.ballY;
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

  async update(index: number, updatePlayingInfoInput: UpdatePlayingInfoInput) {
    const playingInfo = await PlayingInfo.findOne(index);
    if (updatePlayingInfoInput.uuid) {
      playingInfo.uuid = updatePlayingInfoInput.uuid;
    }
    if (updatePlayingInfoInput.ballX || updatePlayingInfoInput.ballX === 0) {
      playingInfo.ballX = updatePlayingInfoInput.ballX;
    }
    if (updatePlayingInfoInput.ballY || updatePlayingInfoInput.ballY === 0) {
      playingInfo.ballY = updatePlayingInfoInput.ballY;
    }
    if (updatePlayingInfoInput.player1Y || updatePlayingInfoInput.player1Y === 0) {
      playingInfo.player1Y = updatePlayingInfoInput.player1Y;
    }
    if (updatePlayingInfoInput.player2Y || updatePlayingInfoInput.player2Y === 0) {
      playingInfo.player2Y = updatePlayingInfoInput.player2Y;
    }
    if (updatePlayingInfoInput.player1Score || updatePlayingInfoInput.player1Score === 0) {
      playingInfo.player1Score = updatePlayingInfoInput.player1Score;
    }
    if (updatePlayingInfoInput.player2Score || updatePlayingInfoInput.player2Score === 0) {
      playingInfo.player2Score = updatePlayingInfoInput.player2Score;
    }
    const validate_error = await validate(playingInfo);
    if (validate_error.length > 0) {
      const _error = { playingInfo: 'PlayingInfo Input is not valid' };
      throw new HttpException({ message: 'PlayingInfo Input validation failed', _error }, HttpStatus.BAD_REQUEST);
    } else {
      await PlayingInfo.save(playingInfo);
      return playingInfo;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} playingInfo`;
  }
}
