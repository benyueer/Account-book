import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Tag } from './entities/tag.entity'

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  async findAllByUser(userId: string): Promise<Tag[]> {
    return this.tagsRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    })
  }

  async create(name: string, userId: string): Promise<Tag> {
    const existingTag = await this.tagsRepository.findOne({
      where: { name, userId },
    })
    if (existingTag) {
      return existingTag
    }

    const newTag = this.tagsRepository.create({
      name,
      userId,
    })
    return this.tagsRepository.save(newTag)
  }
}
