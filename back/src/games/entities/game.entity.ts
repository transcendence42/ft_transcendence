import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';


@Entity('game') // typeORM decorator
@ObjectType() // graphQL decorator
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ default: false }) // typeORM decorator
  @Field(() => Boolean, { defaultValue: true }) // graphQL decorator
  isPlaying: boolean;

  @Column({ length: 15, nullable: true })
  @Field(() => String, { nullable: true })
  winnerId: string;

  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  winnerScore: number;

  @Column({ length: 15, nullable: true })
  @Field(() => String, { nullable: true })
  loserId: string;

  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  loserScore: number;

  @CreateDateColumn()
  @Field(() => Date, { defaultValue: Date.now() })
  createdAt: Date;

  @Column({ nullable: true })
  @Field(() => Date, { nullable: true })
  finishedAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { defaultValue: Date.now() })
  modifiedAt: Date;
}
