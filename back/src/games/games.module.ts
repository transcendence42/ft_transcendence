import { forwardRef, Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesResolver } from './games.resolver';
import { UsersModule } from 'src/users/users.module';
import { PlayingInfoModule } from 'src/playing-info/playing-info.module';

@Module({
  imports: [forwardRef(() => UsersModule), forwardRef(() => PlayingInfoModule)],
  providers: [GamesResolver, GamesService],
  exports: [GamesService],
})
export class GamesModule {}
