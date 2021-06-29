import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @Field()
  readonly username: string;

  @IsNotEmpty()
  @Field()
  readonly email: string;

  @IsNotEmpty()
  @Field()
  readonly password: string;
}
