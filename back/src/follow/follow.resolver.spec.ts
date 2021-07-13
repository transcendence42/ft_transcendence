import { Test, TestingModule } from '@nestjs/testing';
import { FollowResolver } from './follow.resolver';
import { FollowService } from './follow.service';

describe('FollowResolver', () => {
  let resolver: FollowResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FollowResolver, FollowService],
    }).compile();

    resolver = module.get<FollowResolver>(FollowResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
