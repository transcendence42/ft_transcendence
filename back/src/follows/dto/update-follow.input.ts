import { CreateFollowInput } from './create-follow.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFollowInput extends PartialType(CreateFollowInput) {
  @Field(() => Int)
  index: number;

  @Field(() => Boolean, { nullable: true })
  checked: Boolean;

  @Field(() => Boolean, { nullable: true })
  blocked: Boolean;
}
