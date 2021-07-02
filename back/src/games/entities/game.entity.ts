import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';


@Entity('game') // typeORM decorator
@ObjectType() // graphQL decorator
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'boolean',  default: true }) // typeORM decorator
  @Field(() => Boolean, { defaultValue: true }) // graphQL decorator
  isPlaying: boolean;

  @Column({ type:'varchar', length: 15 })
  @Field(() => String)
  playerOneId: string;

  @Column({ type:'integer', default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  playerOneScore: number;

  @Column({ type:'varchar', length: 15 })
  @Field(() => String)
  playerTwoId: string;

  @Column({ type:'integer', default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  playerTwoScore: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date, { defaultValue: Date.now() })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  @Field(() => Date, { nullable: true })
  finishedAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date, { defaultValue: Date.now() })
  modifiedAt: Date;
}
