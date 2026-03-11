import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Transaction } from '../transactions/entities/transaction.entity'
import { LedgerTransaction } from './entities/ledger-transaction.entity'
import { Ledger } from './entities/ledger.entity'
import { LedgersController } from './ledgers.controller'
import { LedgersService } from './ledgers.service'

@Module({
  imports: [TypeOrmModule.forFeature([Ledger, LedgerTransaction, Transaction])],
  controllers: [LedgersController],
  providers: [LedgersService],
  exports: [LedgersService],
})
export class LedgersModule { }
