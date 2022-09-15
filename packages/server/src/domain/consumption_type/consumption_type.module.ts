import { Module } from '@nestjs/common';
import { ConsumptionTypeService } from './consumption_type.service';
import { ConsumptionTypeResolver } from './consumption_type.resolver';
import { registerEnumType } from '@nestjs/graphql';
import { BASE_TYPE, ConsumptionType } from './entity/consumption_type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Family } from '../family/entity/family.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConsumptionType, Family])],
  providers: [ConsumptionTypeService, ConsumptionTypeResolver],
})
export class ConsumptionTypeModule {
  constructor() {
    registerEnumType(BASE_TYPE, { name: 'BASE_TYPE' });
  }
}
