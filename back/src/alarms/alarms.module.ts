import { Module } from '@nestjs/common';
import { AlarmsService } from './alarms.service';
import { AlarmsResolver } from './alarms.resolver';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [AlarmsResolver, AlarmsService],
})
export class AlarmsModule {}
