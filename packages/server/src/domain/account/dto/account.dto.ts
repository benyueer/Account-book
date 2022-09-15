import { Field, InputType } from '@nestjs/graphql';
import { ACCOUNT_TYPE } from '../entity/account.entity';

@InputType()
export class AccountInput {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field(() => ACCOUNT_TYPE, { nullable: true })
  type: ACCOUNT_TYPE;

  @Field({ nullable: true })
  userId: number;

  @Field({ nullable: true })
  no: string;

  @Field({ nullable: true })
  overage: number;
}
