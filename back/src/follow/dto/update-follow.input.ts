import { CreateFollowInput } from './create-follow.input';
import { InputType, PartialType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateFollowInput extends PartialType(CreateFollowInput) {
  @Field()
  index: number;

  @Field({ nullable: true })
  checked: Boolean;

  @Field({ nullable: true })
  blocked: Boolean;
}
