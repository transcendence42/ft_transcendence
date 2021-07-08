import { PassportSerializer } from '@nestjs/passport';
import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';
import { AuthenticationProvider } from '../auth';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthenticationProvider) {
    super();
  }

  serializeUser(user: User, done: (err: Error, user: User) => void) {
    done(null, user);
  } // 실제 session을 어떻게 저장할지

  async deserializeUser(user: User, done: (err: Error, user: User) => void) {
    const userDB = await this.authService.findUser(user.userID);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
