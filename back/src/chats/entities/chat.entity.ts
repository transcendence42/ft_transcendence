import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

@ObjectType()
@Entity('Chat')
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  index: number;

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column('varchar')
  name: string;
  @Column('varchar')
  password: string;
  @Column('boolean')
  isAlive: boolean;
  @Column('boolean')
  type: boolean;
  @Column('varchar')
  ownerID: string;
  // @Column('varchar')
  // adminID: string[];
  // @Column('varchar')
  // userID: string[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  modifiedAt: Date;
}
