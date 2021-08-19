import { Test, TestingModule } from '@nestjs/testing';
import { PlayingInfoResolver } from './playing-info.resolver';
import { PlayingInfoService } from './playing-info.service';

describe('PlayingInfoResolver', () => {
  let resolver: PlayingInfoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayingInfoResolver, PlayingInfoService],
    }).compile();

    resolver = module.get<PlayingInfoResolver>(PlayingInfoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
