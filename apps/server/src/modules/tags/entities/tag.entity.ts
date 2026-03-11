import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'name', type: 'varchar', length: 50, nullable: false, comment: '标签名称' })
  name: string

  @Column({ name: 'userId', type: 'uuid', comment: '用户id' })
  userId: string

  @CreateDateColumn({ name: 'createdAt', comment: '创建时间' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updatedAt', comment: '更新时间' })
  updatedAt: Date
}
