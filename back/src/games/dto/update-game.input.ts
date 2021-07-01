import { CreateGameInput } from './create-game.input';
import { InputType, Field, PartialType, Int} from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateGameInput extends PartialType(CreateGameInput) {
  @Field(() => Int)
  id: number;

  @IsNotEmpty()
  @Field()
  isPlaying: boolean;
  
  @IsNotEmpty()
  @Field()
  readonly winnerId: string;

  @IsNotEmpty()
  @Field(() => Int)
  readonly winnerScore: number;

  @IsNotEmpty()
  @Field()
  readonly loserId: string;

  @IsNotEmpty()
  @Field(() => Int)
  readonly loserScore: number;

  @IsNotEmpty()
  @Field()
  finishedAt: Date;

  @IsNotEmpty()
  @Field()
  modifiedAt: Date;
}
