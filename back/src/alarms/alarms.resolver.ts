import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { AlarmsService } from './alarms.service';
import { Alarm } from './entities/alarm.entity';
import { CreateAlarmInput } from './dto/create-alarm.input';
import { CheckAlarmInput } from './dto/check-alarm.input';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

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
  findOne(@Args('PP_400_index', { type: () => Int }) PP_400_index: number) {
    return this.alarmsService.findOne(PP_400_index);
  }

  @Query(() => [Alarm], { name: 'userAlarm' })
  findUserAlarm(@Args('PP_400_userID', { type: () => String }) PP_400_userID: string) {
    return this.alarmsService.findUserAlarm(PP_400_userID);
  }

  @Mutation(() => Alarm)
  checkAlarm(@Args('checkAlarmInput') checkAlarmInput: CheckAlarmInput) {
    return this.alarmsService.update(checkAlarmInput.PP_400_index, checkAlarmInput);
  }

  @Mutation(() => Alarm)
  removeAlarm(@Args('PP_400_index', { type: () => Int }) PP_400_index: number) {
    return this.alarmsService.remove(PP_400_index);
  }

  @Mutation(() => Alarm)
  addAlarm(@Args('createAlarmInput') createAlarmInput: CreateAlarmInput) {
    const newAlarm = this.alarmsService.create(createAlarmInput);
    pubSub.publish('alarmAdded', { alarmAdded: newAlarm });
    return newAlarm;
  }

  @Subscription(() => Alarm, {
    name: 'alarmAdded',
    filter(this: AlarmsResolver, payload, variables) {
      return payload.alarmAdded.PP_400_userID === variables.PP_400_userID;
    },
  })
  addAlarmHandler() {
    return pubSub.asyncIterator('alarmAdded');
  }
}
