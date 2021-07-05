import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @Field(() => String)
  readonly userID: string;

  @IsNotEmpty()
  @Field(() => String)
  readonly nickname: string;
}
