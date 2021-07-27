import { Test, TestingModule } from '@nestjs/testing';
import { PlayingInfoService } from './playing-info.service';

describe('PlayingInfoService', () => {
  let service: PlayingInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayingInfoService],
    }).compile();

    service = module.get<PlayingInfoService>(PlayingInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
