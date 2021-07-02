import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsBoolean } from 'class-validator';

@InputType()
export class CheckAlarmInput {
  @IsInt()
  @Field(() => Int)
  PP_400_index: number;

  @IsBoolean()
  @Field(() => Boolean)
  PP_400_checked: boolean;
}
