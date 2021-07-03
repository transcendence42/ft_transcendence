import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAlarmInput } from './dto/create-alarm.input';
import { CheckAlarmInput } from './dto/check-alarm.input';
import { Alarm } from './entities/alarm.entity';
import { validate } from 'class-validator';

@Injectable()
export class AlarmsService {
  async create(createAlarmInput: CreateAlarmInput) {
    const alarm = new Alarm();
    alarm.PP_400_userID = createAlarmInput.PP_400_userID;
    alarm.PP_400_title = createAlarmInput.PP_400_title;
    alarm.PP_400_content = createAlarmInput.PP_400_content;
    alarm.PP_400_type = createAlarmInput.PP_400_type;
    alarm.PP_400_link = createAlarmInput.PP_400_link;

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

  async findOne(PP_400_index: number) {
    const alarm = await Alarm.findOne({ PP_400_index: PP_400_index });
    return alarm;
  }

  async findUserAlarm(PP_400_userID: string) {
    const alarms = await Alarm.find({ PP_400_userID: PP_400_userID, PP_400_checked: false });
    return alarms;
  }

  async update(PP_400_index: number, checkAlarmInput: CheckAlarmInput) {
    const alarm = await Alarm.findOne(PP_400_index);
    alarm.PP_400_checked = checkAlarmInput.PP_400_checked;
    const validate_error = await validate(alarm);
    if (validate_error.length > 0) {
      const _error = { username: 'UserInput is not valid check type' };
      throw new HttpException({ message: 'Input data validation failed', _error }, HttpStatus.BAD_REQUEST);
    }
    return await Alarm.save(alarm);
  }

  async remove(PP_400_index: number) {
    const alarm = await Alarm.findOne(PP_400_index);
    if (!alarm) {
      const _error = { username: `Alarm does not exist` };
      throw new HttpException({ message: 'Wrong ID', _error }, HttpStatus.BAD_REQUEST);
    }
    return await Alarm.remove(alarm);
  }
}
