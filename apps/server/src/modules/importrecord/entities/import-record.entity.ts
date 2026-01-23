import { ImportRecord as ImportRecordInterface, ImportRecordStatus } from '@account-book/types'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('import_records')
export class ImportRecord implements ImportRecordInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'file_name' })
  fileName: string

  @Column({ name: 'file_type' })
  fileType: string

  @Column({
    type: 'enum',
    enum: ImportRecordStatus,
    default: ImportRecordStatus.PENDING,
  })
  status: ImportRecordStatus

  @Column({ name: 'total_count', default: 0 })
  totalCount: number

  @Column({ name: 'success_count', default: 0 })
  successCount: number

  @Column({ name: 'fail_count', default: 0 })
  failCount: number

  @Column({ name: 'error_message', nullable: true, type: 'text' })
  errorMessage?: string

  @Column({ name: 'import_time', type: 'timestamp', nullable: true })
  importTime: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string
}
