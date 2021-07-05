import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { validate } from 'class-validator';

@Injectable()
export class UsersService {
  async create(createUserInput: CreateUserInput) {
    const user = new User();
    user.userID = createUserInput.userID;
    user.nickname = createUserInput.nickname;

    const validate_error = await validate(user);
    if (validate_error.length > 0) {
      const _error = { username: 'UserInput is not valid check type' };
      throw new HttpException({ message: 'Input data validation failed', _error }, HttpStatus.BAD_REQUEST);
    } else {
      return await User.save(user);
    }
  }

  async findAll() {
    const users = await User.find();
    return users;
  }

  async findOne(userID: string) {
    const user = await User.findOne({ userID: userID });
    return user;
  }

  async update(userID: string, updateUserInput: UpdateUserInput) {
    const user = await User.findOne({ userID: userID });
    user.userID = updateUserInput.userID;
    user.nickname = updateUserInput.nickname;
    user.avatar = updateUserInput.avatar;
    user.ladderRating = updateUserInput.ladderRating;
    user.totalWin = updateUserInput.totalWin;
    user.totalLose = updateUserInput.totalLose;
    user.friendID = updateUserInput.friendID;
    user.blockID = updateUserInput.blockID;
    user.userState = updateUserInput.userState;
    user.modifiedAt = updateUserInput.modifiedAt;
    const validate_error = await validate(user);
    if (validate_error.length > 0) {
      const _error = { username: 'UserInput is not valid check type' };
      throw new HttpException({ message: 'Input data validation failed', _error }, HttpStatus.BAD_REQUEST);
    } else {
      return await User.save(user);
    }
  }

  async remove(userID: string) {
    const user = await User.findOne({ userID: userID });
    if (!user) {
      const _error = { id: `(${userID}) User does not exist.` };
      throw new HttpException({ message: 'Wrong ID', _error }, HttpStatus.BAD_REQUEST);
    }
    return await User.remove(user);
  }
}
