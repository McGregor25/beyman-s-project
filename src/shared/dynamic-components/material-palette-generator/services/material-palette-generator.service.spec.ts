import { TestBed } from '@angular/core/testing';

import { MaterialPaletteGeneratorService } from './material-palette-generator.service';

describe('MaterialPaletteGeneratorService', () => {
  let service: MaterialPaletteGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialPaletteGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
