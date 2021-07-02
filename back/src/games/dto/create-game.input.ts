import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateGameInput {
    @Field(() => String)
    readonly playerOneId: string;

    @Field(() => String)
    readonly playerTwoId: string;
}
