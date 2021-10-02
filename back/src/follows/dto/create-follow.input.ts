import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateFollowInput {
  @IsNotEmpty()
  @Field(() => String)
  followingID: string;

  @IsNotEmpty()
  @Field(() => String)
  followerID: string;
}
