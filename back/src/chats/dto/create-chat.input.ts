import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

export type ChatType = 'public' | 'private' | 'dm';

@InputType()
export class CreateChatInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  password: string;

  @Field({ defaultValue: 'public' })
  type: ChatType;

  @Field()
  @IsNotEmpty()
  ownerID: string;
}
