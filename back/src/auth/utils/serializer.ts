import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: User, done: (err: Error, user: User) => void) {
    done(null, user);
  } // 실제 session을 어떻게 저장할지

  deserializeUser(user: User, done: (err: Error, user: User) => void) {
    done(null, null); // db에 없을 때
  }
}
