import { Ledger as LedgerInterface } from '@account-book/types'
import { IsOptional, IsString, IsUUID, Length } from 'class-validator'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('ledgers')
export class Ledger implements LedgerInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false, comment: '账本名称' })
  @IsString()
  @Length(1, 50)
  name: string

  @Column({ nullable: true, type: 'text', comment: '账本描述' })
  @IsOptional()
  @IsString()
  @Length(0, 200)
  description: string

  @Column({ name: 'userId', type: 'uuid', comment: '用户id' })
  @IsUUID()
  userId: string

  @CreateDateColumn({ name: 'createdAt', comment: '创建时间' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updatedAt', comment: '更新时间' })
  updatedAt: Date
}
