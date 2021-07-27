import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePlayingInfoInput {
  @Field(() => Int)
  index: number;

  @Field()
  uuid: string;

  @Field()
  ballX: number;

  @Field()
  ballY: number;

  @Field()
  player1Y: number;

  @Field()
  player2Y: number;
}
