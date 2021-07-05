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
  findOne(@Args('index', { type: () => Int }) index: number) {
    return this.alarmsService.findOne(index);
  }

  @Query(() => [Alarm], { name: 'userAlarm' })
  findUserAlarm(@Args('userID', { type: () => String }) userID: string) {
    return this.alarmsService.findUserAlarm(userID);
  }

  @Mutation(() => Alarm)
  checkAlarm(@Args('checkAlarmInput') checkAlarmInput: CheckAlarmInput) {
    return this.alarmsService.update(checkAlarmInput.index, checkAlarmInput);
  }

  @Mutation(() => Alarm)
  removeAlarm(@Args('index', { type: () => Int }) index: number) {
    return this.alarmsService.remove(index);
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
      return payload.alarmAdded.userID === variables.userID;
    },
  })
  addAlarmHandler() {
    return pubSub.asyncIterator('alarmAdded');
  }
}
