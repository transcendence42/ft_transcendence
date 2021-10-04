import { forwardRef, Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesResolver } from './games.resolver';
import { UsersModule } from 'src/users/users.module';
import { PlayingInfoService } from 'src/playing-info/playing-info.service';

@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [GamesResolver, GamesService, PlayingInfoService],
})
export class GamesModule {}
