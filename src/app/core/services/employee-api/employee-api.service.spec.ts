import { TestBed } from '@angular/core/testing';

import { EmployeeApiService } from './employee-api.service';

describe('EmployeeApiService', () => {
  let employeeApiService: EmployeeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeApiService],
    });
    employeeApiService = TestBed.inject(EmployeeApiService);
  });

  it('should be created', () => {
    expect(employeeApiService).toBeTruthy();
  });

  it('should get all employees', () => {
    pending();
  });
});
