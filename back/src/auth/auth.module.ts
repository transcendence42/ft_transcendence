import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FtStrategy } from './ft.strategy';
import { UsersService } from 'src/users/users.service';
import { SessionSerializer } from './utils/serializer';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './utils/constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    FtStrategy,
    SessionSerializer,
    AuthService,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    UsersService,
    JwtStrategy,
  ],
  exports: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    JwtModule,
  ],
})
export class AuthModule {}
