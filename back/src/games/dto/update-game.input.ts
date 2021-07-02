import { CreateGameInput } from './create-game.input';
import { InputType, Field, PartialType, Int} from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateGameInput extends PartialType(CreateGameInput) {
  @Field(() => Int)
  readonly id: number;

  @IsNotEmpty()
  @Field()
  isPlaying: boolean;

  @IsNotEmpty()
  @Field(() => Int)
  playerOneScore: number;

  @IsNotEmpty()
  @Field(() => Int)
  playerTwoScore: number;

  @IsNotEmpty()
  @Field()
  finishedAt: Date;

  @IsNotEmpty()
  @Field()
  modifiedAt: Date;
}
