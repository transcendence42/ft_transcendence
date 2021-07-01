import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateGameInput {
    @IsNotEmpty()
    @Field()
    readonly winnerScore: number;

    @IsNotEmpty()
    @Field()
    readonly loserScore: number;
}
