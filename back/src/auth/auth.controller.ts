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
  login(@Res() res) {}

  /*
   * /auth/redirect
   * Oauth provider가 부를 redirect url
   */
  @Get('redirect')
  @UseGuards(FtAuthGuard)
  // @Header('Access-Control-Allow-Origin', '*')
  // @Header('Access-Control-Expose-Headers', 'Set-Cookie')
  // @Header('Access-Control-Allow-Credentials', 'true')
  async redirect(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    if (req.user) {
      const token = await this.authService.login(req.user);
      console.log(token);
      res.cookie('access_token', token.access_token, {
        httpOnly: false,
        // maxAge: 60 * 60 * 24,
        // sameSite: 'none',
        // domain: 'http://127.0.0.1:3000',
        // secure: false, //https 사용시 true
      });
      res.status(302).redirect('http://127.0.0.1:3000/');
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
  logout() {}
}
