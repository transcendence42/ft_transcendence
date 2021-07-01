import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateGameInput {
    @IsNotEmpty()
    @Field(() => Int)
    readonly winnerScore: number;

    @IsNotEmpty()
    @Field(() => Int)
    readonly loserScore: number;
}
