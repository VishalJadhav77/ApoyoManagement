import { TestBed } from '@angular/core/testing';
import { CandidateApplication } from './candidate-application';

describe('CandidateApplication', () => {
  let service: CandidateApplication;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidateApplication);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
