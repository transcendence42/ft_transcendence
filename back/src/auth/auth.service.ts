import { Injectable } from '@nestjs/common';
import { AuthenticationProvider, UserDetails } from './auth';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService implements AuthenticationProvider {
  constructor(private usersService: UsersService) {}
  async validateUser(details: UserDetails) {
    const { username } = details;
    const user: User | null = await this.usersService.findOne(username);
    if (user) {
      console.log('login succes');
      return user;
    }
    console.log(details);
    const newUser = await this.createUser(details);
  }
  createUser(details: UserDetails) {
    const user = this.usersService.create({
      userID: details.username,
      nickname: details.username,
      avatar: details.photos[0]['value'],
    });
    return;
  }
  findUser() {
    return;
  }
}
