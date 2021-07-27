import { CreatePlayingInfoInput } from './create-playing-info.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePlayingInfoInput extends PartialType(CreatePlayingInfoInput) {
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
