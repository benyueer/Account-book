import { Test, TestingModule } from '@nestjs/testing';
import { ConsumptionTypeResolver } from './consumption_type.resolver';

describe('ConsumptionTypeResolver', () => {
  let resolver: ConsumptionTypeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsumptionTypeResolver],
    }).compile();

    resolver = module.get<ConsumptionTypeResolver>(ConsumptionTypeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
