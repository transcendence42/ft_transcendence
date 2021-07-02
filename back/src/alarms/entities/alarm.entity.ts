import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BaseEntity } from 'typeorm';

@ObjectType()
@Entity('alarm')
export class Alarm extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  PP_400_index: number;

  @Column({ type: 'varchar', length: 200 })
  @Field()
  PP_400_userID: string;

  @Column({ type: 'varchar', length: 200 })
  @Field()
  PP_400_title: string;

  @Column({ type: 'text' })
  @Field()
  PP_400_content: string;

  @Column({ default: false })
  @Field()
  PP_400_checked: boolean;

  @Column({ type: 'varchar', length: 20, default: '' })
  @Field()
  PP_400_type: string;

  @Column({ default: '' })
  @Field()
  PP_400_link: string;

  @CreateDateColumn()
  @Field()
  PP_400_createdAt: Date;
}
