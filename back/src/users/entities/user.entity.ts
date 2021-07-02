import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Column, BaseEntity, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  index: number;

  @Column({ type: 'varchar', length: 15 })
  @Field(() => String)
  userID: string;

  @Column({ type: 'varchar', length: 30 })
  @Field(() => String)
  nickname: string;

  @Column({ type: 'varchar', nullable: true })
  @Field(() => String, { nullable: true })
  avatar: string

  @Column({ type: 'int', default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  ladderRating: number

  @Column({ type: 'int', default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  totalWin: number

  @Column({ type: 'int', default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  totalLose: number

  @Column({ type: 'varchar', array: true, nullable: true })
  @Field(() => [String])
  friendID: string[]

  @Column({ type: 'varchar', array: true, nullable: true })
  @Field(() => [String])
  blockID: string[]

  @Column({ type: 'varchar', array: true, nullable: true })
  @Field(() => [String])
  chatList: string[]

  @Column({ nullable: true })
  @Field()
  userState: string

  @CreateDateColumn({ type: 'date' })
  @Field(() => Date, { defaultValue: Date.now() })
  createdAt: Date

  @UpdateDateColumn({ type: 'date' })
  @Field(() => Date, { defaultValue: Date.now() })
  modifiedAt: Date
}
