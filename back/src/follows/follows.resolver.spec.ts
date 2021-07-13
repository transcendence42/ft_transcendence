import { Test, TestingModule } from '@nestjs/testing';
import { FollowsResolver } from './follows.resolver';
import { FollowsService } from './follows.service';

describe('FollowsResolver', () => {
  let resolver: FollowsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FollowsResolver, FollowsService],
    }).compile();

    resolver = module.get<FollowsResolver>(FollowsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
