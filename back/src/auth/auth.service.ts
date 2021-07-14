import { Injectable } from '@nestjs/common';
import { AuthenticationProvider, UserDetails } from './auth';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements AuthenticationProvider {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(details: UserDetails) {
    const { username } = details;
    const user: User | null = await this.usersService.findOne(username);
    if (user) {
      console.log('login success');
      return user;
    }
    const newUser = await this.createUser(details);
    return newUser;
  }

  login(user: User): { access_token: string } {
    const payload = { username: user.nickname, sub: user.userID };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  createUser(details: UserDetails) {
    this.usersService.create({
      userID: details.username,
      nickname: details.username,
      avatar: details.photos[0]['value'],
    });
    return;
  }
  findUser(userID: string): Promise<User> | undefined {
    return this.usersService.findOne(userID);
  }
}
