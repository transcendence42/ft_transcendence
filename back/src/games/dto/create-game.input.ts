import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateGameInput {
    @Field(() => String)
    readonly playerOneID: string;

    @Field(() => String)
    readonly playerTwoID: string;
}
