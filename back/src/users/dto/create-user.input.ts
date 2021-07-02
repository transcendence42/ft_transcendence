import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @Field(() => String)
  readonly id: string;

  @IsNotEmpty()
  @Field(() => String)
  readonly nickname: string;
}
