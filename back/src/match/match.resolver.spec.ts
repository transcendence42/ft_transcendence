import { Test, TestingModule } from '@nestjs/testing';
import { MatchResolver } from './match.resolver';
import { MatchService } from './match.service';

describe('MatchResolver', () => {
  let resolver: MatchResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchResolver, MatchService],
    }).compile();

    resolver = module.get<MatchResolver>(MatchResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
