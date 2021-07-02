import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesResolver } from './games.resolver';

@Module({
  providers: [GamesResolver, GamesService]
})
export class GamesModule {}
