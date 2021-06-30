import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGameInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
