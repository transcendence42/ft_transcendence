import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { UsersService } from 'src/users/users.service';
import { CreateFollowInput } from './dto/create-follow.input';
import { UpdateFollowInput } from './dto/update-follow.input';
import { Follow } from './entities/follow.entity';
import { forwardRef, Inject } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FollowsService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}
  async create(createFollowInput: CreateFollowInput) {
    const follow = new Follow();
    follow.follower = await this.usersService.findOne(createFollowInput.followerID);
    follow.following = await this.usersService.findOne(createFollowInput.followingID);

    const validate_error = await validate(follow);
    if (validate_error.length > 0) {
      const _error = { follow: 'FollowInput is not valid check type' };
      throw new HttpException({ message: 'Input data validation failed', _error }, HttpStatus.BAD_REQUEST);
    } else {
      let f4f = await this.findF4F(follow.follower, follow.following);
      if (f4f) {
        f4f.checked = true;
        follow.checked = true;
        Follow.save(f4f);
      }
      return await Follow.save(follow);
    }
  }

  async findAll() {
    const follows = await Follow.getRepository()
      .createQueryBuilder('follow')
      .leftJoinAndSelect('follow.following', 'followinguser')
      .leftJoinAndSelect('follow.follower', 'followeruser')
      .getMany();
    return follows;
  }

  // 역으로 팔로잉 돼있는지 체크, 맞팔돼있으면 해당 follow 정보 반환
  async findF4F(follower: User, following: User) {
    const follow = await Follow.findOne({
      where: {
        following: follower,
        follower: following,
      },
    });
    return follow;
  }

  async findFollowers({ index: index }) {
    const follows = await Follow.getRepository()
      .createQueryBuilder('follow')
      .where('follow.followingIndex = :id', { id: index })
      .leftJoinAndSelect('follow.follower', 'followeruser')
      .getMany();
    return follows;
  }

  async findFollowings({ index: index }) {
    const follows = await Follow.getRepository()
      .createQueryBuilder('follow')
      .where('follow.followerIndex = :id', { id: index })
      .leftJoinAndSelect('follow.following', 'followinguser')
      .getMany();
    return follows;
  }

  async findFriends(userIndex: number) {
    const friends = await Follow.getRepository()
      .createQueryBuilder('follow')
      .where('follow.followingIndex = :index', { index: userIndex })
      .andWhere('follow.checked = :checked', { checked: true })
      .select('follow.followerIndex')
      .getRawMany();
    // console.log(friends);
    return friends;
  }

  async findOne(index: number) {
    const follow = await Follow.findOne(index);
    return follow;
  }

  async update(index: number, updateFollowInput: UpdateFollowInput) {
    const follow = await Follow.findOne({ index: index });
    follow.checked = updateFollowInput.checked;
    follow.blocked = updateFollowInput.blocked;
    const validate_error = await validate(follow);
    if (validate_error.length > 0) {
      const _error = { follow: 'FollowInput is not valid check type' };
      throw new HttpException({ message: 'Input data validation failed', _error }, HttpStatus.BAD_REQUEST);
    } else {
      return await Follow.save(follow);
    }
  }

  async remove(index: number) {
    const follow = await Follow.findOne({ index: index });
    if (!follow) {
      const _error = { id: `(${index}) Follow does not exist.` };
      throw new HttpException({ message: 'Wrong ID', _error }, HttpStatus.BAD_REQUEST);
    }
    return await Follow.remove(follow);
  }
}
