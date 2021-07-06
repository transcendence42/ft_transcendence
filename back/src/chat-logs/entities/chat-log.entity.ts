import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class ChatLog extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  index: number;

  @Field()
  @Column({ type: 'uuid' })
  chatUUID: string;

  @Field()
  @Column()
  userID: string;

  @Field()
  @Column({ type: 'text' })
  message: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
