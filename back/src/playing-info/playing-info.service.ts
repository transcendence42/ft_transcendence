import { Injectable } from '@nestjs/common';
import { CreatePlayingInfoInput } from './dto/create-playing-info.input';
import { UpdatePlayingInfoInput } from './dto/update-playing-info.input';

@Injectable()
export class PlayingInfoService {
  create(createPlayingInfoInput: CreatePlayingInfoInput) {
    return 'This action adds a new playingInfo';
  }

  findAll() {
    return `This action returns all playingInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playingInfo`;
  }

  update(id: number, updatePlayingInfoInput: UpdatePlayingInfoInput) {
    return `This action updates a #${id} playingInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} playingInfo`;
  }
}
