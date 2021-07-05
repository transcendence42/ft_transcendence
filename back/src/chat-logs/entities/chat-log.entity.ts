import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ChatLog {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
