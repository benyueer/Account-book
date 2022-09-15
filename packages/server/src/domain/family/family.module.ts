import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Family } from './entity/family.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Family])],
})
export class FamilyModule {}
