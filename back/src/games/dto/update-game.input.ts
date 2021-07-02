import { CreateGameInput } from './create-game.input';
import { InputType, Field, PartialType, Int} from '@nestjs/graphql';
import { IsBoolean, IsInt, IsDate } from 'class-validator';

@InputType()
export class UpdateGameInput extends PartialType(CreateGameInput) {
  @Field(() => Int)
  readonly id: number;

  @IsBoolean()
  @Field()
  isPlaying: boolean;

  @IsInt()
  @Field(() => Int)
  playerOneScore: number;

  @IsInt()
  @Field(() => Int)
  playerTwoScore: number;

  @IsDate()
  @Field()
  finishedAt: Date;

  @IsDate()
  @Field()
  modifiedAt: Date;
}
