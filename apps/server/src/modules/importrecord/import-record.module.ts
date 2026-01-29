import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Transaction } from '../transactions/entities/transaction.entity'
import { ImportRecord } from './entities/import-record.entity'
import { ImportRecordController } from './import-record.controller'
import { ImportRecordProcessor } from './import-record.processor'
import { ImportRecordService } from './import-record.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([ImportRecord, Transaction]),
    BullModule.registerQueue({
      name: 'import-record',
    }),
  ],
  controllers: [ImportRecordController],
  providers: [ImportRecordService, ImportRecordProcessor],
  exports: [ImportRecordService],
})
export class ImportRecordModule { }
