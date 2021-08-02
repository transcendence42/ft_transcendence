import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePlayingInfoInput {
  @Field()
  uuid: string;

  @Field()
  ballX: number;

  @Field()
  ballY: number;

  @Field()
  ballVelocityX: number;

  @Field()
  ballVelocityY: number;

  @Field()
  player1Y: number;

  @Field()
  player2Y: number;
}
