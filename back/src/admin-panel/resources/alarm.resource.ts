import { ResourceWithOptions } from 'admin-bro';
import { Alarm } from 'src/alarms/entities/alarm.entity';

const AlarmResource: ResourceWithOptions = {
  resource: Alarm,
  options: {},
};

export default AlarmResource;
