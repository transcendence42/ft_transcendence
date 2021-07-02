import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CheckAlarmInput {
  @IsNotEmpty()
  @Field(() => Int)
  PP_400_index: number;

  @IsNotEmpty()
  @Field(() => Boolean)
  PP_400_checked: boolean;
}
