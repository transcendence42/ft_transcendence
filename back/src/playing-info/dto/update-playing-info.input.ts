import { CreatePlayingInfoInput } from './create-playing-info.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePlayingInfoInput extends PartialType(CreatePlayingInfoInput) {
  @Field(() => Int)
  index: number;

  @Field({ nullable: true })
  uuid: string;

  @Field({ nullable: true })
  ballX: number;

  @Field({ nullable: true })
  ballY: number;

  @Field({ nullable: true })
  player1Y: number;

  @Field({ nullable: true })
  player2Y: number;

  @Field({ nullable: true })
  player1Score: number;

  @Field({ nullable: true })
  player2Score: number;
}
