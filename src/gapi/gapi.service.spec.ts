import { Test, TestingModule } from '@nestjs/testing';
import { GapiService } from './gapi.service';

describe('GapiService', () => {
  let service: GapiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GapiService],
    }).compile();

    service = module.get<GapiService>(GapiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
