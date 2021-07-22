import { Strategy } from 'passport-42';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { AuthenticationProvider, UserDetails } from '../auth';

@Injectable()
export class FtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthenticationProvider) {
    super({
      clientID: process.env.FT_CLIENT_ID,
      clientSecret: process.env.FT_CLIENT_SECRET,
      callbackURL: 'http://127.0.0.1:5500/auth/redirect',
      scope: 'public',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { username, photos } = profile;
    const details: UserDetails = { username, photos };
    const user = await this.authService.validateUser(details);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
