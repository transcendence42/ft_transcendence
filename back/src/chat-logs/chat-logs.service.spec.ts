import { Test, TestingModule } from '@nestjs/testing';
import { ChatLogsService } from './chat-logs.service';

describe('ChatLogsService', () => {
  let service: ChatLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatLogsService],
    }).compile();

    service = module.get<ChatLogsService>(ChatLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
