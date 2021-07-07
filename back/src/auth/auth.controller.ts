import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { FtAuthGuard } from './ft.guard';

@Controller('auth')
export class AuthController {
  /*
   * /auth/login
   * Oauth provider로 redirect가 이뤄질 곳
   */
  @Get('login')
  @UseGuards(FtAuthGuard)
  login() {
    return;
  }

  /*
   * /auth/redirect
   * Oauth provider가 부를 redirect url
   */
  @Get('redirect')
  @UseGuards(FtAuthGuard)
  redirect(@Res() res: Response) {
    console.log('haha');
    res.redirect('http://localhost:5500');
  }

  /*
   * /auth/logout
   */
  @Get('logout')
  logout() {}
}
