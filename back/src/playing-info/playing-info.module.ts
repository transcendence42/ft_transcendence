import { Module } from '@nestjs/common';
import { PlayingInfoService } from './playing-info.service';
import { PlayingInfoResolver } from './playing-info.resolver';

@Module({
  providers: [PlayingInfoResolver, PlayingInfoService]
})
export class PlayingInfoModule {}
