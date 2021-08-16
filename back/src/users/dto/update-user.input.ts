import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  userID: string;

  @Field(() => String, { nullable: true })
  twoFactorAuthSecret: string;

  @Field({ nullable: true })
  nickname: string;

  @Field({ nullable: true })
  avatar: string;

  @Field({ nullable: true })
  ladderRating: number;

  @Field({ nullable: true })
  totalWin: number;

  @Field({ nullable: true })
  totalLose: number;

  @Field({ nullable: true })
  userState: string;

  @Field({ nullable: true })
  modifiedAt: Date;
}
