import { TestBed } from '@angular/core/testing';

import { GroupLogicService } from './groupLogic.service';

describe('GroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupLogicService = TestBed.get(GroupLogicService);
    expect(service).toBeTruthy();
  });
});
