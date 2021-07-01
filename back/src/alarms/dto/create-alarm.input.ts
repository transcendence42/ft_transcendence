import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateAlarmInput {
  @IsNotEmpty()
  @Field(() => String)
  readonly PP_400_userID: string;

  @IsNotEmpty()
  @Field(() => String)
  readonly PP_400_title: string;

  @IsNotEmpty()
  @Field(() => String)
  readonly PP_400_content: string;

  @IsNotEmpty()
  @Field(() => String)
  readonly PP_400_type: string;

  @Field(() => String)
  readonly PP_400_link: string;
}
