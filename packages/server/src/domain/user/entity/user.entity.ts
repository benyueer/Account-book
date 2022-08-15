import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { isNullableType } from 'graphql';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;
  
  @Field({nullable: true})
  @Column({
    unique: true
  })
  name: string;

  @Column()
  @Field({nullable: false})
  password: string;
}

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  password: string;
};