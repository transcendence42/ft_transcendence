import { Strategy } from 'passport-42';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { AuthenticationProvider, UserDetails } from '../auth';

@Injectable()
export class FtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthenticationProvider) {
    super({
      clientID: 'fffcef501b01441dd6381384c8f02f2323423b7332cdc83c22d72bffc55c5066',
      clientSecret: '15bdf2dc5fe3bfb83ae000d9f2173966c73f19c535f72898f53abfe733458db6',
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
