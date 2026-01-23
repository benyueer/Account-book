import { ImportRecordStatus } from '@account-book/types'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ImportRecord } from './entities/import-record.entity'

@Injectable()
export class ImportRecordService {
  constructor(
    @InjectRepository(ImportRecord)
    private importRecordRepository: Repository<ImportRecord>,
  ) { }

  async findAll(userId: string, page = 1, limit = 10) {
    const [items, total] = await this.importRecordRepository.findAndCount({
      where: { userId },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    })

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  }

  async create(userId: string, fileName: string, fileType: string) {
    const record = this.importRecordRepository.create({
      userId,
      fileName,
      fileType,
      status: ImportRecordStatus.PENDING,
    })
    return this.importRecordRepository.save(record)
  }

  async uploadSimulated(userId: string, fileName: string, fileType: string) {
    const record = await this.create(userId, fileName, fileType)

    // 延迟 3s 模拟处理过程
    setTimeout(async () => {
      await this.importRecordRepository.update(record.id, {
        status: ImportRecordStatus.SUCCESS,
        importTime: new Date(),
        totalCount: 100,
        successCount: 100,
      })
    }, 3000)

    await new Promise(resolve => setTimeout(resolve, 3000))

    return record
  }
}
