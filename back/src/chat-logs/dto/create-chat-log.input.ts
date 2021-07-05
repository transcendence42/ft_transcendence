import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateChatLogInput {
  @Field()
  @IsNotEmpty()
  readonly chatID: string;

  @Field()
  @IsNotEmpty()
  readonly userID: string;

  @Field()
  @IsNotEmpty()
  readonly message: string;
}
