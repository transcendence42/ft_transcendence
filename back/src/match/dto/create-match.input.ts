import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMatchInput {
  @Field(() => String)
  readonly userID: string;

  @Field(() => String)
  readonly uuid: string;

  @Field(() => String)
  player1: string;

  @Field(() => String)
  player2: string;
}
