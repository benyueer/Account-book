import { Field } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/base_entity';
import { Account } from 'src/domain/account/entity/account.entity';
import { User } from 'src/domain/user/entity/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Record extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.records)
  user: User;

  @ManyToOne(() => Account, (account) => account.records)
  account: Account;

  @Field()
  @Column()
  type: number;

  @Field()
  @Column()
  date: Date;

  @Column()
  amount: number;

  @Column()
  createBy: number;

  @Column()
  createAt: Date;

  /**
   * 商家
   */
  @Column({ nullable: true })
  merchant: string;

  @Column({ nullable: true })
  remark: string;

  @Column()
  img: string;
}
