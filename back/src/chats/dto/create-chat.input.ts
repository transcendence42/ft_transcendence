import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateChatInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
