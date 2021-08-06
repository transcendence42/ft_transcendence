import { Injectable } from '@nestjs/common';
import { AuthenticationProvider, UserDetails } from './auth';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { authenticator } from 'otplib';

@Injectable()
export class AuthService implements AuthenticationProvider {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(details: UserDetails) {
    const { username } = details;
    const user: User | null = await this.usersService.findOneByUserID(username);
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

  async createUser(details: UserDetails) {
    const user = await this.usersService.create({
      userID: details.username,
      nickname: details.username,
      avatar: details.photos[0]['value'],
    });
    return user;
  }

  async findUser(userID: string): Promise<User> | undefined {
    return await this.usersService.findOneByUserID(userID);
  }

  async generateTwoFactorAuthSecret(user: User) {
    const secret = authenticator.generateSecret();
    const otpAuthUrl = authenticator.keyuri(
      `${user.userID}@student.42seoul.kr`,
      process.env.TWO_FACTOR_AUTHENTICATION_APP_NAME,
      secret,
    );
    await this.usersService.setTwoFactorAuthSecret(secret, user.userID);
    return otpAuthUrl;
  }

  isTwoFactorAuthCodeValid(twoFactorAuthCode: string, secret: string) {
    return authenticator.verify({
      token: twoFactorAuthCode,
      secret: secret,
    });
  }
}
