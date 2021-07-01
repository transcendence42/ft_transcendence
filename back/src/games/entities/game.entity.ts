import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';


@Entity('game') // typeORM decorator
@ObjectType() // graphQL decorator
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false }) // typeORM decorator
  @Field(() => Boolean, { defaultValue: false }) // graphQL decorator
  isPlaying: boolean;

  @Column({ length: 15 })
  @Field(() => String, { nullable: true })
  winnerId: string;

  @Column()
  @Field(() => Int, {defaultValue: 0})
  winnerScore: number;

  @Column({ length: 15 })
  @Field(() => String, { nullable: true })
  loserId: string;

  @Column()
  @Field(() => Int, {defaultValue: 0})
  loserScore: number;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @DateColumn()
  @Field(() => Date)
  finishedAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  modifiedAt: Date;
}
