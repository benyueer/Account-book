import { Module } from '@nestjs/common';
import { registerEnumType } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { Record, RECORD_TYPE } from './entity/record.rntity';
import { RecordResolver } from './record.resolver';
import { RecordService } from './record.service';

@Module({
  imports: [TypeOrmModule.forFeature([Record, User])],
  providers: [RecordResolver, RecordService],
})
export class RecordModule {
  constructor() {
    registerEnumType(RECORD_TYPE, { name: 'RECORD_TYPE' })
  }
}
