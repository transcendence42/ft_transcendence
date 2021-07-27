import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class PlayingInfo {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  index: number;

  @Field()
  uuid: string;

  @Field()
  ballX: number;

  @Field()
  ballY: number;

  @Field()
  player1Y: number;

  @Field()
  player2Y: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
