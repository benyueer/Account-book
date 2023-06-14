import { Field, InputType } from "@nestjs/graphql";
import { RECORD_TYPE } from "../entity/record.rntity";

@InputType()
export class RecordInput {
  @Field(() => [Number])
  members: number[]

  @Field(() => RECORD_TYPE)
  type: RECORD_TYPE

  @Field()
  date: Date

  @Field()
  remark: string

  @Field(() => [String], { nullable: true })
  imgs: string[]

  @Field()
  consumptionType: number

  @Field()
  account: number
}