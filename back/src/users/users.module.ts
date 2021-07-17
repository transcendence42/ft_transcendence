import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { AlarmsModule } from 'src/alarms/alarms.module';
import { FollowsModule } from 'src/follows/follows.module';

@Module({
  imports: [forwardRef(() => AlarmsModule), forwardRef(() => AuthModule), forwardRef(() => FollowsModule)],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
