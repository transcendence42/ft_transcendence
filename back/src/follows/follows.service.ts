import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { UsersService } from 'src/users/users.service';
import { CreateFollowInput } from './dto/create-follow.input';
import { BlockInput, UpdateFollowInput } from './dto/update-follow.input';
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
      // user가 follower로 돼있는 정보, 즉 user가 following 하는 정보를 나열
      .where('follow.followerIndex = :index', { index: userIndex })
      // 그 중에 맞팔하고 있는 사람을 추림
      .andWhere('follow.checked = :checked', { checked: true })
      // 그 중에서 내가 block 하지 않은 사람을 추림
      .andWhere('follow.blocked = :blocked', { blocked: false })
      // 그 사람들의 index를 반환함
      .select('follow.followingIndex')
      .getRawMany();
    return friends;
  }

  async findBlockedUsers(userIndex: number) {
    const friends = await Follow.getRepository()
      .createQueryBuilder('follow')
      // user가 follower로 돼있는 정보, 즉 user가 following 하는 정보를 나열
      .where('follow.followerIndex = :index', { index: userIndex })
      // 그 중에서 내가 block 한 사람을 추림
      .andWhere('follow.blocked = :blocked', { blocked: true })
      // 그 사람들의 index를 반환함
      .select('follow.followingIndex')
      .getRawMany();
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

  async findMatchingFollowData(followerIndex: number, followingIndex: number) {
    const follow = await Follow.getRepository()
      .createQueryBuilder('follow')
      .where('follow.followerIndex = :followerIndex', { followerIndex: followerIndex })
      .andWhere('follow.followingIndex = :followingIndex', { followingIndex: followingIndex })
      .getOne();
    return follow;
  }

  async createWithUser(follower: User, following: User) {
    const follow = new Follow();
    follow.follower = follower;
    follow.following = following;
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

  async toggleBlock(blockInput: BlockInput) {
    const follower = await this.usersService.findOne(blockInput.followerID);
    const following = await this.usersService.findOne(blockInput.followingID);
    const followData = await this.findMatchingFollowData(follower.index, following.index);

    if (followData) {
      followData.blocked = followData.blocked ? false : true;
      return await Follow.save(followData);
    } else {
      const newFollowData = await this.createWithUser(follower, following);
      newFollowData.blocked = true;
      return await Follow.save(newFollowData);
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
