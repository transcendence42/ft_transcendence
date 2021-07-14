import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Follow } from '../../follows/entities/follow.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('user')
@InputType('user')
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  index: number;

  @Column({ type: 'varchar', length: 15, unique: true })
  @Field(() => String, {})
  userID: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  @Field(() => String, { nullable: true })
  nickname: string;

  @Column({ type: 'varchar', default: '' })
  @Field(() => String, { defaultValue: '' })
  avatar: string;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  ladderRating: number;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  totalWin: number;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  totalLose: number;

  @OneToMany(() => Follow, (follow) => follow.following)
  @Field((type) => [Follow]!, { defaultValue: [] })
  followings: Follow[];

  @OneToMany(() => Follow, (follow) => follow.follower)
  @Field((type) => [Follow]!, { defaultValue: [] })
  followers: Follow[];

  @Column({ type: 'varchar', array: true, default: [] })
  @Field(() => [String], { defaultValue: [] })
  blockID: string[];
  // default status set
  @Column({ default: 'login' })
  @Field({ defaultValue: 'login' })
  userState: string;

  @CreateDateColumn()
  @Field(() => Date, { defaultValue: new Date() })
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { defaultValue: new Date() })
  modifiedAt: Date;
}
