import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGameInput {
  @Field(() => String)
  readonly playerOneID: string;

  @Field(() => String)
  readonly playerTwoID: string;

  @Field(() => String)
  readonly uuid: string;
}
