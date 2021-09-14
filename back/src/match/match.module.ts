import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchResolver } from './match.resolver';

@Module({
  providers: [MatchResolver, MatchService]
})
export class MatchModule {}
