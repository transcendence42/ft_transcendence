import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateGameInput {
    @IsNotEmpty()
    @Field(() => String)
    readonly playerOneId: string;

    @IsNotEmpty()
    @Field(() => String)
    readonly playerTwoId: number;
}
