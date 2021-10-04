import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export type ChatType = 'public' | 'private' | 'dm';

@InputType()
export class CreateChatInput {
  @Field()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(20)
  name: string;

  @Field({ nullable: true })
  password: string;

  @Field({ defaultValue: 'public' })
  type: ChatType;

  @Field()
  @IsNotEmpty()
  ownerID: string;

  @Field(() => [String])
  @IsNotEmpty()
  userID: string[];
}
