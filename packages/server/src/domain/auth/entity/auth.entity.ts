import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Token {
  @Field({ nullable: true })
  access_token: string;

  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  familyId: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  avatar: string
}
