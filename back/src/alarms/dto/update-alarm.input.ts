import { CreateAlarmInput } from './create-alarm.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAlarmInput extends PartialType(CreateAlarmInput) {
  @Field(() => Int)
  id: number;
}
