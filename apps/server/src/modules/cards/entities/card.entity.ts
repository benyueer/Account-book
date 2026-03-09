import { Card as CardInterface, CardType } from '@account-book/types'
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID, Length, Min } from 'class-validator'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('cards')
export class Card implements CardInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'bankName', nullable: false, comment: '银行名称' })
  @IsString()
  @Length(1, 100)
  bankName: string

  @Column({ name: 'bankLogo', nullable: true, comment: '银行Logo' })
  @IsOptional()
  @IsString()
  bankLogo: string

  @Column({ name: 'lastFourDigits', nullable: false, length: 4, comment: '卡尾号' })
  @IsString()
  @Length(4, 4)
  lastFourDigits: string

  @Column({ name: 'balance', type: 'decimal', precision: 12, scale: 2, default: 0, comment: '余额' })
  @IsNumber()
  @Min(0)
  balance: number

  @Column({ name: 'cardType', type: 'enum', enum: CardType, default: CardType.DEBIT, comment: '卡片类型' })
  @IsEnum(CardType)
  cardType: CardType

  @Column({ name: 'userId', type: 'uuid', nullable: false, comment: '用户ID' })
  @IsUUID()
  userId: string

  @CreateDateColumn({ name: 'createdAt', comment: '创建时间' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updatedAt', comment: '更新时间' })
  updatedAt: Date
}
