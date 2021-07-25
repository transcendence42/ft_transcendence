import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateChatLogInput {
  @Field()
  @IsNotEmpty()
  readonly chatUUID: string;

  @Field()
  @IsNotEmpty()
  readonly userID: string;

  @Field()
  @IsNotEmpty()
  readonly message: string;

  @Field()
  @IsNotEmpty()
  readonly type: string;
}
