import { Test, TestingModule } from '@nestjs/testing';
import { GamesResolver } from './games.resolver';
import { GamesService } from './games.service';

describe('GamesResolver', () => {
  let resolver: GamesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamesResolver, GamesService],
    }).compile();

    resolver = module.get<GamesResolver>(GamesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
