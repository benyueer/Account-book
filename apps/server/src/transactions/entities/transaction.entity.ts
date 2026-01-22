import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export enum TransactionType {
  INCOME = 'income', // 收入
  EXPENSE = 'expense', // 支出
}

export enum PaymentMethod {
  CASH = 'cash', // 现金
  ALIPAY = 'alipay', // 支付宝
  WECHAT = 'wechat', // 微信
  BANK_CARD = 'bankCard', // 银行卡
  CREDIT_CARD = 'creditCard', // 信用卡
  OTHER = 'other', // 其他
}

export enum TransactionStatus {
  PENDING = 'pending', // 待处理
  COMPLETED = 'completed', // 已完成
  FAILED = 'failed', // 已失败
  CANCELLED = 'cancelled', // 已取消
}

@Entity('transactions')
export class Transaction {
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
  @IsEnum(TransactionType)
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

  @Column({ name: 'paymentMethod', nullable: true, type: 'enum', enum: PaymentMethod, comment: '收/付款方式/支付方式' })
  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod

  @Column({ name: 'transactionStatus', nullable: false, type: 'enum', enum: TransactionStatus, default: TransactionStatus.COMPLETED, comment: '交易状态/当前状态' })
  @IsEnum(TransactionStatus)
  transactionStatus: TransactionStatus

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

  @CreateDateColumn({ name: 'createdAt', comment: '创建时间' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updatedAt', comment: '更新时间' })
  updatedAt: Date
}
