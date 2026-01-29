import { ImportRecord as ImportRecordInterface, ImportRecordStatus } from '@account-book/types'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('import_records')
export class ImportRecord implements ImportRecordInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'file_name', comment: '文件名' })
  fileName: string

  @Column({ name: 'file_type', comment: '文件类型' })
  fileType: string

  @Column({
    type: 'enum',
    enum: ImportRecordStatus,
    default: ImportRecordStatus.PENDING,
  })
  status: ImportRecordStatus

  @Column({ name: 'total_count', default: 0, comment: '总数' })
  totalCount: number

  @Column({ name: 'success_count', default: 0, comment: '成功数' })
  successCount: number

  @Column({ name: 'fail_count', default: 0, comment: '失败数' })
  failCount: number

  @Column({ name: 'error_message', nullable: true, type: 'text', comment: '错误信息' })
  errorMessage?: string

  @Column({ name: 'import_time', type: 'timestamp', nullable: true, comment: '导入时间' })
  importTime: Date

  @CreateDateColumn({ name: 'created_at', comment: '创建时间' })
  createdAt: Date

  @Column({ name: 'user_id', type: 'uuid', comment: '用户id' })
  userId: string

  @Column({ name: 'title', nullable: true, comment: '账单标题' })
  title?: string

  @Column({ name: 'nickname', nullable: true, comment: '用户昵称' })
  nickname?: string

  @Column({ name: 'start_time', type: 'timestamp', nullable: true, comment: '账单开始时间' })
  startTime?: Date

  @Column({ name: 'end_time', type: 'timestamp', nullable: true, comment: '账单结束时间' })
  endTime?: Date

  @Column({ name: 'export_time', type: 'timestamp', nullable: true, comment: '账单导出时间' })
  exportTime?: Date

  @Column({ name: 'total_income_cost', type: 'decimal', precision: 12, scale: 2, default: 0, comment: '总收入' })
  totalIncomeCost: number

  @Column({ name: 'total_income_count', type: 'int', default: 0, comment: '收入笔数' })
  totalIncomeCount: number

  @Column({ name: 'total_expense_cost', type: 'decimal', precision: 12, scale: 2, default: 0, comment: '总支出' })
  totalExpenseCost: number

  @Column({ name: 'total_expense_count', type: 'int', default: 0, comment: '支出笔数' })
  totalExpenseCount: number

  @Column({ name: 'bill_notes', type: 'text', nullable: true, comment: '账单备注/注意事项' })
  billNotes?: string
}
