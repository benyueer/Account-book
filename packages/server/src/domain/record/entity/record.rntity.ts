import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/base_entity';
import { Account } from 'src/domain/account/entity/account.entity';
import { User } from 'src/domain/user/entity/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';


export enum RECORD_TYPE {
  IN,
  OUT
}

@ObjectType()
@Entity()
export class Record extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToMany(() => User, (user) => user.records)
  users: User[];

  @Field()
  @Column()
  consumptionType: number

  @Field(() => Account)
  @ManyToOne(() => Account, (account) => account.records)
  account: Account;

  @Field(() => RECORD_TYPE)
  @Column({
    type: 'enum',
    enum: RECORD_TYPE
  })
  type: RECORD_TYPE;

  @Field()
  @Column()
  date: Date;

  @Field()
  @Column({nullable: true})
  amount: number;

  @Column()
  createAt: Date;

  /**
   * 商家
   */
  @Column({ nullable: true })
  merchant: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  remark: string;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true })
  imgs: string[];
}
