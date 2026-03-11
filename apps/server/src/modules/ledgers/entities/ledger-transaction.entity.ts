import { LedgerTransaction as LedgerTransactionInterface } from '@account-book/types'
import { IsUUID } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('ledger_transactions')
export class LedgerTransaction implements LedgerTransactionInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'ledgerId', type: 'uuid', comment: '账本id' })
  @IsUUID()
  ledgerId: string

  @Column({ name: 'transactionId', type: 'uuid', comment: '交易id' })
  @IsUUID()
  transactionId: string
}
