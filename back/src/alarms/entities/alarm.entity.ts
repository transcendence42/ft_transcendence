import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BaseEntity } from 'typeorm';

@ObjectType()
@Entity('alarm')
export class Alarm extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  index: number;

  @Column({ type: 'varchar', length: 200 })
  @Field(() => String)
  userID: string;

  @Column({ type: 'varchar', length: 200 })
  @Field(() => String)
  title: string;

  @Column({ type: 'text' })
  @Field(() => String)
  content: string;

  @Column({ default: false })
  @Field(() => String)
  checked: boolean;

  @Column({ type: 'varchar', length: 20, default: '' })
  @Field(() => String)
  type: string;

  @Column({ default: '' })
  @Field(() => String)
  link: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;
}
