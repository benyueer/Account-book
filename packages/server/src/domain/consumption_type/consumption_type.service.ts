import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Family } from '../family/entity/family.entity';
import { CreateTypeInput } from './dto/consumption_type.dto';
import { ConsumptionType } from './entity/consumption_type.entity';

@Injectable()
export class ConsumptionTypeService {
  constructor(
    @InjectRepository(ConsumptionType)
    private rep: Repository<ConsumptionType>,
    @InjectRepository(Family)
    private fRep: Repository<Family>,
    private configService: ConfigService,
  ) {}

  async createConsumptionType(type: CreateTypeInput) {
    const family = await this.fRep.findOneBy({ id: type.familyId });
    type['family'] = family;
    return await this.rep.save(type);
  }

  async queryCons(familyId: number) {
    return await this.rep.find({
      relations: ['family'],
      where: [
        {
          family: [
            { id: familyId },
            { id: this.configService.get('BASE_FAMILY_ID') },
          ],
        },
      ],
    });
  }
}
