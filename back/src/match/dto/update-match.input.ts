import { CreateMatchInput } from './create-match.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMatchInput extends PartialType(CreateMatchInput) {
  @Field(() => String)
  readonly userID: string;

  @Field(() => String)
  readonly uuid: string;

  @Field(() => String)
  player1: string;

  @Field(() => String)
  player2: string;
}
