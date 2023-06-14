import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RecordInput } from './dto/record.dto';
import { Record } from './entity/record.rntity';
import { RecordService } from './record.service';

@Resolver()
export class RecordResolver {
  constructor(
    private rSrv: RecordService
  ) {}
  @Query(() => [Record])
  async recordList(@Args('limit') limit: number, @Args('offset') offset: number, @Args('userIds', { type: () => [Number] }) userIds: number[]) {
    return await this.rSrv.recordList(limit, offset, userIds)
  }

  @Mutation(() => Record)
  async createRecord(@Args('data') data: RecordInput) {
    return await this.rSrv.createRecord(data)
  }
}
