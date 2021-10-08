import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { AlarmsModule } from 'src/alarms/alarms.module';
import { FollowsModule } from 'src/follows/follows.module';
import { PlayingInfoModule } from 'src/playing-info/playing-info.module';

@Module({
  imports: [
    forwardRef(() => AlarmsModule),
    forwardRef(() => AuthModule),
    forwardRef(() => FollowsModule),
    forwardRef(() => PlayingInfoModule),
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
