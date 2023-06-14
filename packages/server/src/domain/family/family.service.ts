import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { Family } from './entity/family.entity';

@Injectable()
export class FamilyService {
  constructor(
    @InjectRepository(User)
    private uRep: Repository<User>
  ) {}

  async getFamilyMembers(id: number) {
    return await this.uRep.find({
      relations: ['family'],
      where: { family: { id } }
    })
  }
}
