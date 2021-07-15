import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('follow')
@InputType('follow')
@ObjectType()
export class Follow extends BaseEntity {
  @PrimaryGeneratedColumn()
  index: number;

  @ManyToOne(() => User, (user) => user.followings, { eager: true })
  @Field(() => User, { nullable: true })
  following: User | null;

  @ManyToOne(() => User, (user) => user.followers, { eager: true })
  @Field(() => User, { nullable: true })
  follower: User | null;

  @Column({ type: Boolean, default: false })
  @Field(() => Boolean, { defaultValue: false })
  checked: Boolean;

  @Column({ type: Boolean, default: false })
  @Field(() => Boolean, { defaultValue: false })
  blocked: Boolean;

  @CreateDateColumn()
  @Field(() => Date, { defaultValue: new Date() })
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { defaultValue: new Date() })
  updatedAt: Date;
}
