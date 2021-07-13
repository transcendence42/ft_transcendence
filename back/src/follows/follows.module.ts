import { Module } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { FollowsResolver } from './follows.resolver';

@Module({
  providers: [FollowsResolver, FollowsService]
})
export class FollowsModule {}
