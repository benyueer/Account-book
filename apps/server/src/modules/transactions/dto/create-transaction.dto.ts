import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator'
import { TransactionType } from '../entities/transaction.entity'

export class CreateTransactionDto {
  @ApiProperty({ example: '2025-01-22T16:08:05.626Z', nullable: true, default: () => new Date() })
  @IsDateString()
  transactionTime: Date

  @ApiProperty({ example: '生活服务' })
  @IsString()
  @Length(1, 100)
  @IsOptional()
  transactionCategory?: string

  @ApiProperty({ example: TransactionType.EXPENSE })
  @IsEnum(TransactionType)
  transactionType: TransactionType

  @ApiProperty({ example: 'Restaurant' })
  @IsString()
  @Length(1, 100)
  @IsOptional()
  counterparty?: string

  @ApiProperty({ example: '123456789' })
  @IsString()
  @Length(1, 100)
  @IsOptional()
  counterpartyAccount?: string

  @ApiProperty({ example: '美川小居麻辣香锅未来科技城店' })
  @IsString()
  @Length(1, 1000)
  @IsOptional()
  productDescription?: string

  @ApiProperty({ example: 100.00 })
  @IsNumber()
  @Min(0.01)
  amount: number

  @ApiProperty({ example: '余额宝' })
  @IsString()
  @Length(1, 100)
  @IsOptional()
  paymentMethod?: string

  @ApiProperty({ example: 'completed' })
  @IsString()
  transactionStatus: string

  @ApiProperty({ example: 'TXN20250122001' })
  @IsString()
  @IsOptional()
  transactionOrderNumber?: string

  @ApiProperty({ example: 'MCH20250122001' })
  @IsString()
  @IsOptional()
  merchantOrderNumber?: string

  @ApiProperty({ example: '备注' })
  @IsString()
  @IsOptional()
  notes?: string

  @ApiProperty({ example: '14123123123123' })
  @IsString()
  @Length(1, 100)
  @IsOptional()
  sourceCard?: string
}
