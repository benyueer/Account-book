import { Test, TestingModule } from '@nestjs/testing';
import { FamilyResolver } from './family.resolver';

describe('FamilyResolver', () => {
  let resolver: FamilyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FamilyResolver],
    }).compile();

    resolver = module.get<FamilyResolver>(FamilyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
