import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsBoolean } from 'class-validator';

@InputType()
export class CheckAlarmInput {
  @IsInt()
  @Field(() => Int)
  index: number;

  @IsBoolean()
  @Field(() => Boolean)
  checked: boolean;
}
