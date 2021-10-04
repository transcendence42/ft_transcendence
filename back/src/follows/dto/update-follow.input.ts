import { CreateFollowInput } from './create-follow.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFollowInput extends PartialType(CreateFollowInput) {
  @Field(() => Int)
  index: number;

  @Field(() => Boolean, { nullable: true })
  checked: boolean;

  @Field(() => Boolean, { nullable: true })
  blocked: boolean;
}

@InputType()
export class BlockInput {
  @Field(() => String)
  followerID: string;

  @Field(() => String)
  followingID: string;
}
