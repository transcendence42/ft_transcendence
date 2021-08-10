import { Controller, Get, Res, UseGuards, Inject, Req, Header, Post } from '@nestjs/common';
import { Response } from 'express';
import { FtAuthGuard, AuthenticatedGuard } from './guards/ft.guard';
import { AuthenticationProvider } from './auth';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthenticationProvider,
    private readonly userService: UsersService,
  ) {}
  /*
   * /auth/login
   * Oauth provider로 redirect가 이뤄질 곳
   */
  @Get('login')
  @UseGuards(FtAuthGuard)
  login(@Req() res) {}

  /*
   * /auth/redirect
   * Oauth provider가 부를 redirect url
   */
  @Get('redirect')
  @UseGuards(FtAuthGuard)
  async redirect(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    if (req.user) {
      const token = await this.authService.login(req.user);
      res.cookie('access_token', token.access_token, {
        httpOnly: false,
      });
      if (req.user.enableTwoFactorAuth === false) {
        res.cookie('two_factor_auth', true, {
          httpOnly: false,
        });
      }
      res.status(302).redirect(`${process.env.HOST}:${process.env.CLIENT_PORT}`);
    }
  }

  /*
   * /auth/redirect
   * Oauth provider가 부를 redirect url
   */
  @Post('otp')
  async setOtpCookie(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    const body = req.body;
    if (body.otp && body.secret) {
      const isValid = this.authService.isTwoFactorAuthCodeValid(body.otp, body.secret);
      console.log('isValid', isValid);
      if (isValid) {
        res.cookie('two_factor_auth', true, {
          httpOnly: false,
        });
      }
      res.status(302).redirect(`${process.env.HOST}:${process.env.CLIENT_PORT}`);
    }
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  status() {
    return 'ok';
  }

  /*
   * /auth/logout
   */
  @Get('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('two_factor_auth');
    res.cookie('access_token', '', {
      httpOnly: false,
    });

    res.status(302).redirect(`${process.env.HOST}:${process.env.CLIENT_PORT}`);
  }
}
