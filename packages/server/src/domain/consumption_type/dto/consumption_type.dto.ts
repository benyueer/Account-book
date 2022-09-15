import { Field, InputType } from '@nestjs/graphql';
import { BASE_TYPE } from '../entity/consumption_type.entity';

@InputType()
export class CreateTypeInput {
  @Field({ nullable: true })
  id: number;

  @Field(() => BASE_TYPE, { nullable: true })
  baseType: BASE_TYPE;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  pid: number;

  @Field({ nullable: true })
  familyId: number;
}
