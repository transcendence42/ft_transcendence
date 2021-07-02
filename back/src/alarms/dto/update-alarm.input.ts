import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateAlarmInput {
  @IsNotEmpty()
  @Field(() => Int)
  PP_400_index: number;

  @IsNotEmpty()
  @Field(() => Boolean)
  PP_400_checked: boolean;
}
