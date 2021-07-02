// import { CreateAlarmInput } from './create-alarm.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

// extends PartialType(CreateAlarmInput)
@InputType()
export class UpdateAlarmInput {
  @IsNotEmpty()
  @Field()
  PP_400_index: number;

  @IsNotEmpty()
  @Field(() => Boolean)
  PP_400_checked: boolean;
}
