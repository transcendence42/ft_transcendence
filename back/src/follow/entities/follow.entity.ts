import { ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Follow extends BaseEntity {
  @PrimaryGeneratedColumn()
  index: number;

  @ManyToOne(() => User, (user) => user.following)
  following: User;

  @ManyToOne(() => User, (user) => user.follower)
  follower: User;

  @Column({ type: Boolean, default: false })
  checked: Boolean;

  @Column({ type: Boolean, default: false })
  blocked: Boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
