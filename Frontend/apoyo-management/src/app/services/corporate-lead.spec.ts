import { TestBed } from '@angular/core/testing';
import { CorporateLead } from './corporate-lead';

describe('CorporateLead', () => {
  let service: CorporateLead;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateLead);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
