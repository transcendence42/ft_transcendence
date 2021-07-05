import { CreateChatLogInput } from './create-chat-log.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChatLogInput extends PartialType(CreateChatLogInput) {
  @Field(() => Int)
  id: number;
}
