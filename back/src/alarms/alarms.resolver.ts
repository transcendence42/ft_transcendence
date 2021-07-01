import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AlarmsService } from './alarms.service';
import { Alarm } from './entities/alarm.entity';
import { CreateAlarmInput } from './dto/create-alarm.input';
import { UpdateAlarmInput } from './dto/update-alarm.input';

@Resolver(() => Alarm)
export class AlarmsResolver {
  constructor(private readonly alarmsService: AlarmsService) {}

  @Mutation(() => Alarm)
  createAlarm(@Args('createAlarmInput') createAlarmInput: CreateAlarmInput) {
    return this.alarmsService.create(createAlarmInput);
  }

  @Query(() => [Alarm], { name: 'alarms' })
  findAll() {
    return this.alarmsService.findAll();
  }

  @Query(() => Alarm, { name: 'alarm' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.alarmsService.findOne(id);
  }

  @Mutation(() => Alarm)
  updateAlarm(@Args('updateAlarmInput') updateAlarmInput: UpdateAlarmInput) {
    return this.alarmsService.update(updateAlarmInput.id, updateAlarmInput);
  }

  @Mutation(() => Alarm)
  removeAlarm(@Args('id', { type: () => Int }) id: number) {
    return this.alarmsService.remove(id);
  }
}
