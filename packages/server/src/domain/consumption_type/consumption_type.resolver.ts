import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ConsumptionTypeService } from './consumption_type.service';
import { CreateTypeInput } from './dto/consumption_type.dto';
import {
  ConsumptionType,
  ConsumptionTypeItem,
} from './entity/consumption_type.entity';

@Resolver()
export class ConsumptionTypeResolver {
  constructor(private consService: ConsumptionTypeService) {}

  @Mutation(() => ConsumptionType)
  async createConsumptionType(@Args('data') data: CreateTypeInput) {
    return await this.consService.createConsumptionType(data);
  }

  @Mutation(() => ConsumptionType)
  async updateConsumptionType(@Args('data') data: CreateTypeInput) {
    return await this.consService.createConsumptionType(data);
  }

  @Query(() => [ConsumptionTypeItem])
  async getConsumptionType(
    @Args('familyId', { nullable: true }) familyId?: number,
  ) {
    return this.consService.queryCons(familyId);
  }
}
