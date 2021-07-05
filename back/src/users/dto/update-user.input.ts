import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  userID: string;

  @Field()
  nickname: string;

  @Field()
  avatar: string;

  @Field()
  ladderRating: number;

  @Field()
  totalWin: number;

  @Field()
  totalLose: number;

  @Field(() => [String])
  friendID: string[];

  @Field(() => [String])
  blockID: string[];

  @Field(() => [String])
  chatList: string[];

  @Field()
  userState: string;

  @Field()
  createdAt: Date;

  @Field()
  modifiedAt: Date;
}
