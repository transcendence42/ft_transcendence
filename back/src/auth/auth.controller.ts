import { Controller, Get, Res, UseGuards, Inject, Req, Header } from '@nestjs/common';
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
    res.cookie('access_token', '', {
      httpOnly: false,
    });
    res.status(302).redirect(`${process.env.HOST}:${process.env.CLIENT_PORT}`);
  }
}
