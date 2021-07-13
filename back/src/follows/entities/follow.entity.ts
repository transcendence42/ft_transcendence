import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { BaseEntity, Column, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export class Follow extends BaseEntity {
  @PrimaryGeneratedColumn()
  index: number;

  @ManyToOne(() => User, (user) => user.following)
  @Field(() => User)
  following: User;

  @ManyToOne(() => User, (user) => user.follower)
  @Field(() => User)
  follower: User;

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
