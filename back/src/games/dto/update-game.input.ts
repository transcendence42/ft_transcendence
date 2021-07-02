import { CreateGameInput } from './create-game.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsDate } from 'class-validator';

@InputType()
export class UpdateGameInput extends PartialType(CreateGameInput) {
  @Field(() => Int)
  readonly id: number;

  @Field({ nullable: true })
  isPlaying: boolean;

  @Field(() => Int, { nullable: true })
  playerOneScore: number;

  @Field(() => Int, { nullable: true })
  playerTwoScore: number;

  @Field({ nullable: true })
  finishedAt: Date;

  @IsDate()
  @Field()
  modifiedAt: Date;
}
