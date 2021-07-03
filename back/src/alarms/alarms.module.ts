import { Module } from '@nestjs/common';
import { AlarmsService } from './alarms.service';
import { AlarmsResolver } from './alarms.resolver';

@Module({
  providers: [AlarmsResolver, AlarmsService]
})
export class AlarmsModule {}
