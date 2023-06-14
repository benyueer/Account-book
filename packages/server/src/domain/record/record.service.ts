import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContainedBy, ArrayContains, FindOperator, In, Like, Repository } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { RecordInput } from './dto/record.dto';
import { Record } from './entity/record.rntity';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private rRep: Repository<Record>,
    @InjectRepository(User)
    private uRep: Repository<User>
  ) { }

  async createRecord(data: RecordInput) {
    console.log(data.members)
    const users = await this.uRep.find({
      where: { id: In(data.members) }
    })
    console.log(users)
    return await this.rRep.save({
      ...data,
      users,
      createAt: new Date()
    } as unknown as Record)
  }

  async recordList(limit: number, offset: number, userIds: number[]) {
    return await this.rRep.createQueryBuilder('record')
      .leftJoinAndSelect('record.users', 'user')
      .where('user.id IN (:userIds)', {userIds: userIds.join(',')})
      .getMany()
  }
}
