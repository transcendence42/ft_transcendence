import { Test, TestingModule } from '@nestjs/testing';
import { ChatLogsResolver } from './chat-logs.resolver';
import { ChatLogsService } from './chat-logs.service';

describe('ChatLogsResolver', () => {
  let resolver: ChatLogsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatLogsResolver, ChatLogsService],
    }).compile();

    resolver = module.get<ChatLogsResolver>(ChatLogsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
