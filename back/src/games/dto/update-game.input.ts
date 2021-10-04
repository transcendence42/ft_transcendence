import { CreateGameInput } from './create-game.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateGameInput extends PartialType(CreateGameInput) {
  @Field(() => String)
  readonly uuid: string;

  @Field({ nullable: true })
  isPlaying: boolean;

  @Field(() => Int, { nullable: true })
  playerOneScore: number;

  @Field(() => Int, { nullable: true })
  playerTwoScore: number;

  @Field({ nullable: true })
  finishedAt: Date;

  @Field(() => Date, { nullable: true, defaultValue: new Date() })
  modifiedAt: Date;
}
