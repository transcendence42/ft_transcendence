import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateAfterGameInput, UpdateUserInput } from './dto/update-user.input';
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
    console.log('user update: ', updateUserInput);
    user.userID = updateUserInput.userID;
    user.nickname = updateUserInput.nickname;
    user.avatar = updateUserInput.avatar;
    user.ladderRating = updateUserInput.ladderRating;
    user.totalWin = updateUserInput.totalWin;
    user.totalLose = updateUserInput.totalLose;
    user.isMatched = updateUserInput.isMatched;
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

  async updateAfterGame(userID: string, updateAfterGameInput: UpdateAfterGameInput) {
    const user = await User.findOne({ userID: userID });

    if (user.userState == 'playing') {
      if (updateAfterGameInput.isWinner) {
        user.totalWin += 1;
        user.ladderRating += 100;
      } else {
        user.totalLose += 1;
        user.ladderRating -= 50;
      }
    }
    user.userID = updateAfterGameInput.userID;
    user.isMatched = updateAfterGameInput.isMatched;
    user.userState = updateAfterGameInput.userState;
    user.modifiedAt = updateAfterGameInput.modifiedAt;

    const validate_error = await validate(user);
    if (validate_error.length > 0) {
      const _error = { username: 'UserInput is not valid check type' };
      throw new HttpException({ message: 'Input data validation failed', _error }, HttpStatus.BAD_REQUEST);
    } else {
      return await User.save(user);
    }
  }

  async updateUserState(userID: string, userState: string) {
    const user = await User.findOne({ userID: userID });
    user.userState = userState;
    const validate_error = await validate(user);
    if (validate_error.length > 0) {
      const _error = { username: 'UserInput is not valid check type' };
      throw new HttpException({ message: 'Input data validation failed', _error }, HttpStatus.BAD_REQUEST);
    } else {
      return await User.save(user);
    }
  }

  // userState 여부도 받아서 업데이트 해주기 👍👍👍
  async updateIsMatched(userID: string, isMatched: string) {
    const user = await User.findOne({ userID: userID });
    user.isMatched = isMatched;
    user.userState = 'playing';

    const validate_error = await validate(user);
    if (validate_error.length > 0) {
      const _error = { username: 'UserInput is not valid check type' };
      throw new HttpException({ message: 'Input data validation failed', _error }, HttpStatus.BAD_REQUEST);
    } else {
      return await User.save(user);
    }
  }

  async updateAvatar(userID: string, avatar: string) {
    const user = await User.findOne({ userID: userID });
    user.avatar = avatar;

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
      console.log('error on set twof actor ');
      const _error = { username: 'UserInput is not valid check type' };
      throw new HttpException({ message: 'Input data validation failed', _error }, HttpStatus.BAD_REQUEST);
    } else {
      return await User.save(user);
    }
  }

  async toggleTwoFactorAuthentication(userID: string) {
    const user = await User.findOne({ userID: userID });
    user.enableTwoFactorAuth = user.enableTwoFactorAuth === true ? false : true;
    const validate_error = await validate(user);
    if (validate_error.length > 0) {
      const _error = { username: 'UserInput is not valid check type' };
      throw new HttpException({ message: 'Input data validation failed', _error }, HttpStatus.BAD_REQUEST);
    } else {
      await User.save(user);
      return user.enableTwoFactorAuth;
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
