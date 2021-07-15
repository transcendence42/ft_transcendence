import { Module, forwardRef } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { FollowsResolver } from './follows.resolver';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [FollowsResolver, FollowsService],
  exports: [FollowsService],
})
export class FollowsModule {}
