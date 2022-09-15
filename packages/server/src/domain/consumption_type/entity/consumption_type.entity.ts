import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/base_entity';
import { Family } from 'src/domain/family/entity/family.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum BASE_TYPE {
  IN,
  OUT,
}

@ObjectType()
@Entity()
export class ConsumptionType extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: BASE_TYPE,
  })
  @Field()
  baseType: BASE_TYPE;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ nullable: true })
  createBy: number;

  @Field()
  @Column({ default: 0 })
  pid: number;

  @ManyToOne(() => Family, (family) => family.consumptionTypes, {
    nullable: true,
  })
  family: Family;

  @Field()
  familyId: number;
}

@ObjectType()
export class ConsumptionTypeItem {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  pid: number;

  @Field(() => BASE_TYPE)
  baseType: BASE_TYPE;

  @Field(() => [ConsumptionTypeItem], { nullable: true, defaultValue: [] })
  children: ConsumptionTypeItem[]
}
