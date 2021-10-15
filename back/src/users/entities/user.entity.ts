import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Follow } from 'src/follows/entities/follow.entity';
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
  @Field(() => Int, {})
  index: number;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean, { defaultValue: false })
  enableTwoFactorAuth: boolean;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  twoFactorAuthSecret: string;

  @Column({ type: 'varchar', length: 15, unique: true })
  @Field(() => String, {})
  userID: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  @Field(() => String, { nullable: true })
  nickname: string;

  @Column({ type: 'varchar', default: '' })
  @Field(() => String, { defaultValue: '' })
  avatar: string;

  @Column({ type: 'int', default: 3000 })
  @Field(() => Int, { defaultValue: 3000 })
  ladderRating: number;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  totalWin: number;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  totalLose: number;

  @OneToMany(() => Follow, (follow) => follow.following)
  @Field(() => [Follow], { nullable: true })
  followings: Follow[];

  @OneToMany(() => Follow, (follow) => follow.follower)
  @Field(() => [Follow], { nullable: true })
  followers: Follow[];

  // default status set
  @Column({ default: 'login' })
  @Field({ defaultValue: 'login' })
  userState: string;

  // notMatched : queue에 넣지 않은 상태
  // waiting: queue 에서 기다리는 중
  // matched: matching 된 상태
  @Column({ type: 'varchar', default: 'notMatched' })
  @Field(() => String, { defaultValue: 'notMatched' })
  isMatched: string;

  @CreateDateColumn()
  @Field(() => Date, { defaultValue: new Date() })
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { defaultValue: new Date() })
  modifiedAt: Date;
}
