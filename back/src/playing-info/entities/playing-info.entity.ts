import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { CreateDateColumn, PrimaryGeneratedColumn, BaseEntity, Entity, Column, UpdateDateColumn } from 'typeorm';

@Entity('PlayingInfo')
@ObjectType()
export class PlayingInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  index: number;

  @Column('varchar')
  @Field()
  uuid: string;

  @Column({ type: 'float', nullable: true, default: 20 })
  @Field(() => Float, { nullable: true, defaultValue: 20 })
  ballX: number;

  @Column({ type: 'float', nullable: true, default: 200 })
  @Field(() => Float, { nullable: true, defaultValue: 200 })
  ballY: number;

  @Column({ type: 'integer', nullable: true, default: 5 })
  @Field(() => Int, { nullable: true, defaultValue: 5 })
  ballVelocityX: number;

  @Column({ type: 'integer', nullable: true, default: 5 })
  @Field(() => Int, { nullable: true, defaultValue: 5 })
  ballVelocityY: number;

  @Column({ type: 'float', nullable: true, default: 350 })
  @Field({ nullable: true, defaultValue: 350 })
  player1Y: number;

  @Column({ type: 'float', nullable: true, default: 350 })
  @Field({ nullable: true, defaultValue: 350 })
  player2Y: number;

  @Column({ type: 'integer', nullable: true, default: 0 })
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  player1Score: number;

  @Column({ type: 'integer', nullable: true, default: 0 })
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  player2Score: number;

  @Column({ type: 'integer', nullable: true, default: 0 })
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  sequence: number;

  @UpdateDateColumn()
  @Field(() => Date, { defaultValue: new Date() })
  modifiedAt: Date;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
