import { forwardRef, Module } from '@nestjs/common';
import { PlayingInfoService } from './playing-info.service';
import { PlayingInfoResolver } from './playing-info.resolver';
import { GamesModule } from 'src/games/games.module';

@Module({
  imports: [forwardRef(() => GamesModule)],
  providers: [PlayingInfoResolver, PlayingInfoService],
})
export class PlayingInfoModule {}
