import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAlarmInput } from './dto/create-alarm.input';
import { UpdateAlarmInput } from './dto/update-alarm.input';
import { Alarm } from './entities/alarm.entity';
import { validate } from 'class-validator';

@Injectable()
export class AlarmsService {
  async create(createAlarmInput: CreateAlarmInput) {
    const _alarm = await Alarm.findOne({ PP_400_userID: createAlarmInput.PP_400_userID });
    if (_alarm) {
      const _error = { PP_400_userID: 'userId is already exists' };
      throw new HttpException({ message: ' Input data validation failed', _error }, HttpStatus.BAD_REQUEST);
    }

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
    } else {
      return await Alarm.save(alarm);
    }

    return 'This action adds a new alarm';
  }

  findAll() {
    return `This action returns all alarms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} alarm`;
  }

  update(id: number, updateAlarmInput: UpdateAlarmInput) {
    return `This action updates a #${id} alarm`;
  }

  remove(id: number) {
    return `This action removes a #${id} alarm`;
  }
}
