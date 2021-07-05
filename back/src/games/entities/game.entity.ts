import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

@Entity('game') // typeORM decorator
@ObjectType() // graphQL decorator
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'boolean', default: true }) // typeORM decorator
  @Field(() => Boolean, { defaultValue: true }) // graphQL decorator
  isPlaying: boolean;

  @Column({ type: 'varchar', length: 15 })
  @Field(() => String)
  playerOneID: string;

  @Column({ type: 'integer', nullable: true, default: 0 })
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  playerOneScore: number;

  @Column({ type: 'varchar', length: 15 })
  @Field(() => String)
  playerTwoID: string;

  @Column({ type: 'integer', nullable: true, default: 0 })
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  playerTwoScore: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date, { defaultValue: new Date() })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  @Field(() => Date, { nullable: true })
  finishedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field(() => Date, { defaultValue: new Date() })
  modifiedAt: Date;
}
