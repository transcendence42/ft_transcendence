import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BaseEntity } from 'typeorm';

@ObjectType()
@Entity('alarm')
export class Alarm extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  PP_400_index: number;

  @Column({ type: 'varchar', length: 200 })
  @Field(() => String)
  PP_400_userID: string;

  @Column({ type: 'varchar', length: 200 })
  @Field(() => String)
  PP_400_title: string;

  @Column({ type: 'text' })
  @Field(() => String)
  PP_400_content: string;

  @Column({ default: false })
  @Field(() => String)
  PP_400_checked: boolean;

  @Column({ type: 'varchar', length: 20, default: '' })
  @Field(() => String)
  PP_400_type: string;

  @Column({ default: '' })
  @Field(() => String)
  PP_400_link: string;

  @CreateDateColumn()
  @Field(() => Date)
  PP_400_createdAt: Date;
}
