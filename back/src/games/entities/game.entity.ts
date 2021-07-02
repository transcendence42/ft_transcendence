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

  @Column({ type:'varchar', length: 15 })
  @Field(() => String)
  playerOneId: string;

  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  playerOneScore: number;

  @Column({ type:'varchar', length: 15 })
  @Field(() => String)
  playerTwoId: string;

  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  playerTwoScore: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Field(() => Date, { defaultValue: Date.now() })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  @Field(() => Date, { nullable: true })
  finishedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field(() => Date, { defaultValue: Date.now() })
  modifiedAt: Date;
}
