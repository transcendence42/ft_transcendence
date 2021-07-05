import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAlarmInput } from './dto/create-alarm.input';
import { CheckAlarmInput } from './dto/check-alarm.input';
import { Alarm } from './entities/alarm.entity';
import { validate } from 'class-validator';

@Injectable()
export class AlarmsService {
  async create(createAlarmInput: CreateAlarmInput) {
    const alarm = new Alarm();
    alarm.userID = createAlarmInput.userID;
    alarm.title = createAlarmInput.title;
    alarm.content = createAlarmInput.content;
    alarm.type = createAlarmInput.type;
    alarm.link = createAlarmInput.link;

    const validate_error = await validate(alarm);
    if (validate_error.length > 0) {
      const _error = { userID: 'UserID is not valid check type' };
      throw new HttpException({ message: 'Input data validation failed', _error }, HttpStatus.BAD_REQUEST);
    }
    return await Alarm.save(alarm);
  }

  async findAll() {
    const alarms = await Alarm.find();
    return alarms;
  }

  async findOne(index: number) {
    const alarm = await Alarm.findOne({ index: index });
    return alarm;
  }

  async findUserAlarm(userID: string) {
    const alarms = await Alarm.find({ userID: userID, checked: false });
    return alarms;
  }

  async update(index: number, checkAlarmInput: CheckAlarmInput) {
    const alarm = await Alarm.findOne(index);
    alarm.checked = checkAlarmInput.checked;
    const validate_error = await validate(alarm);
    if (validate_error.length > 0) {
      const _error = { username: 'UserInput is not valid check type' };
      throw new HttpException({ message: 'Input data validation failed', _error }, HttpStatus.BAD_REQUEST);
    }
    return await Alarm.save(alarm);
  }

  async remove(index: number) {
    const alarm = await Alarm.findOne(index);
    if (!alarm) {
      const _error = { username: `Alarm does not exist` };
      throw new HttpException({ message: 'Wrong ID', _error }, HttpStatus.BAD_REQUEST);
    }
    return await Alarm.remove(alarm);
  }
}
