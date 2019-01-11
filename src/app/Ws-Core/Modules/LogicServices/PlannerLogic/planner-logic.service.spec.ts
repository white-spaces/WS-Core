import { TestBed } from '@angular/core/testing';

import { PlannerLogicService } from './planner-logic.service';

describe('PlannerLogicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlannerLogicService = TestBed.get(PlannerLogicService);
    expect(service).toBeTruthy();
  });
});
