import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateAlarmInput {
  @IsNotEmpty()
  @Field(() => String)
  readonly userID: string;

  @IsNotEmpty()
  @Field(() => String)
  readonly title: string;

  @IsNotEmpty()
  @Field(() => String)
  readonly content: string;

  @IsNotEmpty()
  @Field(() => String)
  readonly type: string;

  @Field(() => String)
  readonly link: string;
}
