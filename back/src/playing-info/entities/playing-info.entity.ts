import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CreateDateColumn, PrimaryGeneratedColumn, BaseEntity, Entity, Column } from 'typeorm';

@Entity('PlayingInfo')
@ObjectType()
export class PlayingInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  index: number;

  // 나중에 @Generated('uuid')로 바꿔야함, nullable도 제거하고
  @Column('varchar', { length: 20, nullable: true })
  @Field({ nullable: true })
  uuid: string;

  @Column({ type: 'integer', nullable: true })
  @Field({ nullable: true })
  ballX: number;

  @Column({ type: 'integer', nullable: true })
  @Field({ nullable: true })
  ballY: number;

  @Column({ type: 'integer', nullable: true })
  @Field({ nullable: true })
  ballVelocityX: number;

  @Column({ type: 'integer', nullable: true })
  @Field({ nullable: true })
  ballVelocityY: number;

  @Column({ type: 'integer', nullable: true })
  @Field({ nullable: true })
  player1Y: number;

  @Column({ type: 'integer', nullable: true })
  @Field({ nullable: true })
  player2Y: number;

  @Column({ type: 'integer', nullable: true, default: 0 })
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  player1Score: number;

  @Column({ type: 'integer', nullable: true, default: 0 })
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  player2Score: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
