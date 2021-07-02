import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  userID: string;

  @IsNotEmpty()
  @Field()
  nickname: string;

  @IsNotEmpty()
  @Field()
  avatar: string;

  @IsNotEmpty()
  @Field()
  ladderRating: number;

  @IsNotEmpty()
  @Field()
  totalWin: number;

  @IsNotEmpty()
  @Field()
  totalLose: number;

  @IsNotEmpty()
  @Field(() => [String])
  friendID: string[];

  @IsNotEmpty()
  @Field(() => [String])
  blockID: string[];

  @IsNotEmpty()
  @Field(() => [String])
  chatList: string[];

  @IsNotEmpty()
  @Field()
  userState: string;

  @IsNotEmpty()
  @Field()
  createdAt: Date;

  @IsNotEmpty()
  @Field()
  modifiedAt: Date;
}
