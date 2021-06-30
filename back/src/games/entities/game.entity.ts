import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Game {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
