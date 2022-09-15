import { BaseEntity } from 'src/common/base_entity';
import { ConsumptionType } from 'src/domain/consumption_type/entity/consumption_type.entity';
import { User } from 'src/domain/user/entity/user.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Family extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id?: number;

  @Field()
  @Column()
  name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  picture?: string;

  @OneToMany(() => User, (user) => user.family)
  users?: User[];

  @OneToMany(() => ConsumptionType, (consumptionType) => consumptionType.family)
  consumptionTypes?: ConsumptionType[];
}
