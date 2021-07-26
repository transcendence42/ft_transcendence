import { Resolver, Query, Mutation, Args, Int, Subscription, ResolveField, Parent } from '@nestjs/graphql';
import { AlarmsService } from './alarms.service';
import { Alarm } from './entities/alarm.entity';
import { CreateAlarmInput } from './dto/create-alarm.input';
import { CheckAlarmInput } from './dto/check-alarm.input';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { PubSubProvider } from '../pub-sub/pub-sub.provider';

@Resolver(() => Alarm)
export class AlarmsResolver {
  constructor(
    private readonly alarmsService: AlarmsService,
    private readonly usersService: UsersService,
    private readonly pubSubProvider: PubSubProvider,
  ) {}

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
  async addAlarm(@Args('createAlarmInput') createAlarmInput: CreateAlarmInput) {
    const newAlarm = await this.alarmsService.create(createAlarmInput);
    this.pubSubProvider.getPubSub().publish('alarmAdded', { alarmAdded: newAlarm });
    return newAlarm;
  }

  @Subscription((returns) => Alarm, {
    name: 'alarmAdded',
    filter(payload, variables) {
      return payload.alarmAdded.userID === variables.userID;
    },
  })
  addAlarmHandler(@Args('userID') userID: string) {
    return this.pubSubProvider.getPubSub().asyncIterator('alarmAdded');
  }

  @ResolveField(() => User)
  user(@Parent() alarm: Alarm) {
    return this.usersService.findOneByUserID(alarm.userID);
  }
}
