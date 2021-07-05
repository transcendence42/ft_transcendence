import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateChatLogInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
