import { Module, forwardRef } from '@nestjs/common';
import { AlarmsService } from './alarms.service';
import { AlarmsResolver } from './alarms.resolver';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [AlarmsResolver, AlarmsService],
  exports: [AlarmsService],
})
export class AlarmsModule {}
