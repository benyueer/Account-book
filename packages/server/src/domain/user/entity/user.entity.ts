import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { isNullableType } from 'graphql';
import { Account } from 'src/domain/account/entity/account.entity';
import { Family } from 'src/domain/family/entity/family.entity';
import { Record } from 'src/domain/record/entity/record.rntity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field({ nullable: true })
  @Column({
    unique: true,
  })
  name: string;

  @Column()
  @Field({ nullable: false })
  password: string;

  @Field(() => Family, { nullable: true })
  @ManyToOne(() => Family, (family) => family.users)
  family: Family;

  @Field(() => [Number], { nullable: true })
  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

  @OneToMany(() => Record, (record) => record.user)
  records: Record[];

  @Column({ nullable: true })
  @Field({ nullable: true })
  avatar: string
}

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  password: string;
}
