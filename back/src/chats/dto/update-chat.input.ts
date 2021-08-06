import { CreateChatInput } from './create-chat.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChatInput extends PartialType(CreateChatInput) {
  @Field()
  uuid: string;

  @Field({ nullable: true })
  isAlive: boolean;

  @Field((type) => [String], { nullable: true })
  adminID: string[];

  @Field((type) => [String], { nullable: true })
  userID: string[];

  @Field((type) => [String], { nullable: true })
  muteID: string[];
}
