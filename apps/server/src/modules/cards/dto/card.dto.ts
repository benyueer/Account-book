import { CardType } from '@account-book/types'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator'

export class CreateCardDto {
  @ApiProperty({ example: '中信银行', description: '银行名称' })
  @IsString()
  @Length(1, 100)
  bankName: string

  @ApiPropertyOptional({ example: 'https://example.com/logo.png', description: '银行Logo' })
  @IsOptional()
  @IsString()
  bankLogo?: string

  @ApiProperty({ example: '1133', description: '卡尾号' })
  @IsString()
  @Length(4, 4)
  lastFourDigits: string

  @ApiProperty({ example: 0, description: '余额' })
  @IsNumber()
  @Min(0)
  balance: number

  @ApiProperty({ enum: CardType, example: CardType.DEBIT, description: '卡片类型' })
  @IsEnum(CardType)
  cardType: CardType
}

export class UpdateCardDto {
  @ApiPropertyOptional({ example: '中信银行', description: '银行名称' })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  bankName?: string

  @ApiPropertyOptional({ example: 'https://example.com/logo.png', description: '银行Logo' })
  @IsOptional()
  @IsString()
  bankLogo?: string

  @ApiPropertyOptional({ example: '1133', description: '卡尾号' })
  @IsOptional()
  @IsString()
  @Length(4, 4)
  lastFourDigits?: string

  @ApiPropertyOptional({ example: 100, description: '余额' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  balance?: number

  @ApiPropertyOptional({ enum: CardType, example: CardType.DEBIT, description: '卡片类型' })
  @IsOptional()
  @IsEnum(CardType)
  cardType?: CardType
}
