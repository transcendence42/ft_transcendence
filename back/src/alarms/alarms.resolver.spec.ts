import { Test, TestingModule } from '@nestjs/testing';
import { AlarmsResolver } from './alarms.resolver';
import { AlarmsService } from './alarms.service';

describe('AlarmsResolver', () => {
  let resolver: AlarmsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlarmsResolver, AlarmsService],
    }).compile();

    resolver = module.get<AlarmsResolver>(AlarmsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
