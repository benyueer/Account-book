import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { Family } from './entity/family.entity';
import { FamilyResolver } from './family.resolver';
import { FamilyService } from './family.service';

@Module({
  imports: [TypeOrmModule.forFeature([Family, User])],
  providers: [FamilyResolver, FamilyService],
})
export class FamilyModule {}
