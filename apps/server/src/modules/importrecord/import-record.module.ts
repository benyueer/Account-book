import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ImportRecord } from './entities/import-record.entity'
import { ImportRecordController } from './import-record.controller'
import { ImportRecordService } from './import-record.service'

@Module({
  imports: [TypeOrmModule.forFeature([ImportRecord])],
  controllers: [ImportRecordController],
  providers: [ImportRecordService],
  exports: [ImportRecordService],
})
export class ImportRecordModule { }
