import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from '../user/entity/user.entity';
import { FamilyService } from './family.service';

@Resolver()
export class FamilyResolver {
  constructor(
    private familySrv: FamilyService
  ) {}
  
  @Query(() => [User])
  async getFamilyMembers(@Args('id') id: number) {
    return await this.familySrv.getFamilyMembers(id)
  }
}
