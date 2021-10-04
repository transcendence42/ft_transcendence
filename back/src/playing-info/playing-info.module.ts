import { forwardRef, Module } from '@nestjs/common';
import { PlayingInfoService } from './playing-info.service';
import { PlayingInfoResolver } from './playing-info.resolver';
import { GamesModule } from 'src/games/games.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule), forwardRef(() => GamesModule)],
  providers: [PlayingInfoResolver, PlayingInfoService],
  exports: [PlayingInfoService],
})
export class PlayingInfoModule {}
