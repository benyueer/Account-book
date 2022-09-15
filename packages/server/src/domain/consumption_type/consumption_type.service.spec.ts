import { Test, TestingModule } from '@nestjs/testing';
import { ConsumptionTypeService } from './consumption_type.service';

describe('ConsumptionTypeService', () => {
  let service: ConsumptionTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsumptionTypeService],
    }).compile();

    service = module.get<ConsumptionTypeService>(ConsumptionTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
