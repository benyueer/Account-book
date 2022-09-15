import { Module } from '@nestjs/common';
import { RecordResolver } from './record.resolver';

@Module({
  providers: [RecordResolver],
})
export class RecordModule {}
