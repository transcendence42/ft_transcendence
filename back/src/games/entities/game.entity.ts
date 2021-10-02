import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  Generated,
} from 'typeorm';

@Entity('game') // typeORM decorator
@ObjectType() // graphQL decorator
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  index: number;

  @Generated('uuid') // uuid 생성 코드. DB에서 생성됨.
  @Column({ type: 'uuid' })
  @Field()
  uuid: string;

  @Column({ type: 'boolean', default: true }) // typeORM decorator
  @Field(() => Boolean, { defaultValue: true }) // graphQL decorator
  isPlaying: boolean;

  @Column({ type: 'varchar', nullable: true, length: 15 })
  @Field(() => String, { nullable: true, defaultValue: 'player1' })
  playerOneID: string;

  @Column({ type: 'integer', nullable: true, default: 0 })
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  playerOneScore: number;

  @Column({ type: 'varchar', nullable: true, length: 15 })
  @Field(() => String, { nullable: true, defaultValue: 'player2' })
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
