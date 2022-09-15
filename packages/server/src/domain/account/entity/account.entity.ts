import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/base_entity';
import { Record } from 'src/domain/record/entity/record.rntity';
import { User } from 'src/domain/user/entity/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum ACCOUNT_TYPE {
  CASH,
  DEBIT_CARD,
  CREDIT_CARD,
}

@ObjectType()
@Entity()
export class Account extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => ACCOUNT_TYPE)
  @Column({
    type: 'enum',
    enum: ACCOUNT_TYPE,
  })
  type: ACCOUNT_TYPE;

  @Field()
  userId: number;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;

  @OneToMany(() => Record, (record) => record.account)
  records: Record[];

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ nullable: true })
  no: string;

  @Field()
  @Column({ default: 0 })
  overage: number;

  @Field()
  @Column({ default: 0 })
  costCount: number;

  @Field()
  @Column({ default: 0 })
  incomeCount: number;
}
