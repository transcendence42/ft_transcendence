import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { validate } from 'class-validator';
import { AlarmsService } from 'src/alarms/alarms.service';
import { FollowsService } from 'src/follows/follows.service';
import { getConnection } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AlarmsService))
    private readonly alarmsService: AlarmsService,
    @Inject(forwardRef(() => FollowsService))
    private readonly followsService: FollowsService,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const user = new User();
    user.userID = createUserInput.userID;
    user.nickname = createUserInput.nickname;
    user.avatar = createUserInput.avatar;

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

  async findOne(index: number) {
    const user = await User.findOne(index);
    return user;
  }

  async findOneByUserID(userID: string) {
    const user = await User.findOne({ userID: userID });
    return user;
  }

  // async findFriends(userID: string) {
  //   const friends = await User.getRepository()
  //     .createQueryBuilder('user')
  //     .select('user.follower')
  //     .where('user.userID = :userID', { userID: userID })
  //     .andWhere('user.follower.checked = :checked', { checked: true })
  //     .getMany();
  //   console.log(friends);
  //   return friends;
  // }

  async update(userID: string, updateUserInput: UpdateUserInput) {
    const user = await User.findOne({ userID: userID });
    user.userID = updateUserInput.userID;
    user.nickname = updateUserInput.nickname;
    user.avatar = updateUserInput.avatar;
    user.ladderRating = updateUserInput.ladderRating;
    user.totalWin = updateUserInput.totalWin;
    user.totalLose = updateUserInput.totalLose;
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

  async setTwoFactorAuthSecret(secret: string, userID: string) {
    const user = await User.findOne({ userID: userID });
    user.twoFactorAuthSecret = secret;

    const validate_error = await validate(user);
    if (validate_error.length > 0) {
      const _error = { username: 'UserInput is not valid check type' };
      throw new HttpException({ message: 'Input data validation failed', _error }, HttpStatus.BAD_REQUEST);
    } else {
      return await User.save(user);
    }
  }

  async calculateLadderRanking(userID: string) {
    const rankingQb = await User.getRepository()
      .createQueryBuilder()
      .select('RANK() OVER (ORDER BY "ladderRating" DESC) AS "ladderRanking"')
      .addSelect('"userID"');
    const ranking = await getConnection()
      .createQueryBuilder()
      .select('"ladderRanking"')
      .from('(' + rankingQb.getQuery() + ')', 'user')
      .where('"userID" = :userID', { userID: userID })
      .getRawOne();
    return ranking.ladderRanking;
  }
}
