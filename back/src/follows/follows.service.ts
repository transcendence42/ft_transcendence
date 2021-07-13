import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { CreateFollowInput } from './dto/create-follow.input';
import { UpdateFollowInput } from './dto/update-follow.input';
import { Follow } from './entities/follow.entity';

@Injectable()
export class FollowsService {
  async create(createFollowInput: CreateFollowInput) {
    const follow = new Follow();
    follow.follower = createFollowInput.follower;
    follow.following = createFollowInput.following;

    const validate_error = await validate(follow);
    if (validate_error.length > 0) {
      const _error = { follow: 'FollowInput is not valid check type' };
      throw new HttpException({ message: 'Input data validation failed', _error }, HttpStatus.BAD_REQUEST);
    } else {
      return await Follow.save(follow);
    }
  }

  findAll() {
    return `This action returns all follows`;
  }

  findOne(index: number) {
    return `This action returns a #${index} follow`;
  }

  update(index: number, updateFollowInput: UpdateFollowInput) {
    return `This action updates a #${index} follow`;
  }

  remove(index: number) {
    return `This action removes a #${index} follow`;
  }
}
