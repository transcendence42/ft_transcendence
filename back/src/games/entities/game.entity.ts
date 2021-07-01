import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity('game') // typeORM decorator
@ObjectType() // graphQL decorator
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false }) // typeORM decorator
  @Field(() => Boolean, { defaultValue: false }) // graphQL decorator
  isPlaying: boolean;

  @Column({ length: 15 })
  @Field(() => String, { nullable: true })
  winnerId: string;

  @Column()
  @Field(() => Int)
  winnerScore: number;

  @Column({ length: 15 })
  @Field(() => String, { nullable: true })
  loserId: string;

  @Column()
  @Field(() => Int)
  loserScore: number;

  @Column()
  @Field(() => Date)
  createdAt: Date;

  @Column()
  @Field(() => Date)
  finishedAt: Date;

  @Column()
  @Field(() => Date)
  modifiedAt: Date;
}
