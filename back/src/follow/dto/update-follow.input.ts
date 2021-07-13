import { CreateFollowInput } from './create-follow.input';
import { InputType, PartialType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateFollowInput extends PartialType(CreateFollowInput) {
  @Field(() => Int)
  index: number;

  @Field(() => Boolean, { nullable: true })
  checked: Boolean;

  @Field(() => Boolean, { nullable: true })
  blocked: Boolean;
}
