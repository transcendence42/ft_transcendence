import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  id: string;

  @IsNotEmpty()
  @Field()
  nickname: string;

  @IsNotEmpty()
  @Field()
  avator: string;

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
  @Field()
  friendID: string[];

  @IsNotEmpty()
  @Field()
  blockID: string[];

  @IsNotEmpty()
  @Field()
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
