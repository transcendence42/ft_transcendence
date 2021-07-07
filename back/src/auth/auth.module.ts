import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FtStrategy } from './ft.strategy';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [AuthController],
  providers: [
    FtStrategy,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    UsersService,
  ],
})
export class AuthModule {}
