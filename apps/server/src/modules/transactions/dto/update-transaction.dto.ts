import { PartialType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'
import { CreateTransactionDto } from './create-transaction.dto'

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @ApiProperty({ example: 'asdasdasfewf' })
  id: string
}
