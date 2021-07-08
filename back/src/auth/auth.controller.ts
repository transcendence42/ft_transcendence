import { Controller, Get, Res, UseGuards, Inject } from '@nestjs/common';
import { Response } from 'express';
import { FtAuthGuard, AuthenticatedGuard } from './guards/ft.guard';
import { AuthenticationProvider } from './auth';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthenticationProvider) {}
  /*
   * /auth/login
   * Oauth provider로 redirect가 이뤄질 곳
   */
  @Get('login')
  @UseGuards(FtAuthGuard)
  login(@Res() res) {
    return this.authService.login(res.user);
  }

  /*
   * /auth/redirect
   * Oauth provider가 부를 redirect url
   */
  @Get('redirect')
  @UseGuards(FtAuthGuard)
  redirect(@Res() res: Response) {
    res.redirect('/');
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
  logout() {}
}
