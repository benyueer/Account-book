import { Transaction as TransactionInterface, TransactionType } from '@account-book/types'
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, IsUUID, Length, Min } from 'class-validator'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('transactions')
export class Transaction implements TransactionInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'timestamp', name: 'transactionTime', nullable: false, comment: '交易时间' })
  @IsDateString()
  transactionTime: Date

  @Column({ name: 'transactionCategory', nullable: true, comment: '交易分类/交易类型' })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  transactionCategory: string

  @Column({ name: 'transactionType', nullable: false, type: 'enum', enum: TransactionType, comment: '收/支' })
  @IsEnum(TransactionType as object)
  transactionType: TransactionType

  @Column({ name: 'counterparty', nullable: true, comment: '交易对方' })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  counterparty: string

  @Column({ name: 'counterpartyAccount', nullable: true, comment: '对方账号' })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  counterpartyAccount: string

  @Column({ name: 'productDescription', nullable: true, type: 'text', comment: '商品说明/商品' })
  @IsOptional()
  @IsString()
  productDescription: string

  @Column({ name: 'amount', type: 'decimal', precision: 10, scale: 2, nullable: false, comment: '金额/金额(元)' })
  @IsNumber()
  @Min(0)
  amount: number

  @Column({ name: 'paymentMethod', nullable: true, comment: '收/付款方式/支付方式' })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  paymentMethod: string

  @Column({ name: 'transactionStatus', nullable: false, default: 'completed', comment: '交易状态/当前状态' })
  @IsString()
  transactionStatus: string

  @Column({ name: 'transactionOrderNumber', nullable: true, unique: true, comment: '交易订单号/交易单号' })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  transactionOrderNumber: string

  @Column({ name: 'merchantOrderNumber', nullable: true, unique: true, comment: '商家订单号/商户单号' })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  merchantOrderNumber: string

  @Column({ name: 'notes', nullable: true, type: 'text', comment: '备注' })
  @IsOptional()
  @IsString()
  notes: string

  @Column({ name: 'sourceCard', nullable: true, type: 'text', comment: '来源银行卡' })
  @IsOptional()
  @IsString()
  sourceCard: string

  @CreateDateColumn({ name: 'createdAt', comment: '创建时间' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updatedAt', comment: '更新时间' })
  updatedAt: Date

  @Column({ name: 'deleteAt', nullable: true, comment: '删除时间' })
  deleteAt: Date

  @Column({ name: 'userId', type: 'uuid', comment: '用户id' })
  @IsUUID()
  userId: string

  @Column({ name: 'importRecordId', type: 'uuid', nullable: true, comment: '导入记录id' })
  @IsUUID()
  @IsOptional()
  importRecordId: string
}
