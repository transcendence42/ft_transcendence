import { ObjectType, Field } from '@nestjs/graphql';
import { Column } from 'typeorm';

@ObjectType()
export class Match {
  @Column({ type: 'varchar', length: 15 })
  @Field(() => String)
  userID: string;

  @Field(() => String)
  uuid: string;

  @Field(() => String)
  player1: string;

  @Field(() => String)
  player2: string;
}
