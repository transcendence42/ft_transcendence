import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Generated,
} from 'typeorm';

export type ChatType = 'public' | 'private' | 'dm';

@ObjectType()
@Entity()
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  index: number;

  @Generated('uuid') // uuid 생성 코드. DB에서 생성됨.
  @Column({ type: 'uuid' })
  @Field()
  uuid: string;

  @Field()
  @Column('varchar', { length: 20 })
  name: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Field()
  @Column({ type: 'boolean', default: true })
  isAlive: boolean;

  @Field()
  @Column({
    type: 'enum',
    enum: ['public', 'private', 'dm'],
    default: 'public',
  })
  type: ChatType;

  @Field()
  @Column('varchar')
  ownerID: string;

  @Field((type) => [String])
  @Column({ type: 'varchar', array: true, nullable: true, default: {} })
  adminID: string[];

  @Field((type) => [String])
  @Column({ type: 'varchar', array: true, nullable: true, default: {} })
  userID: string[];

  @Field((type) => [String])
  @Column({ type: 'varchar', array: true, nullable: true, default: {} })
  muteID: string[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  modifiedAt: Date;
}
