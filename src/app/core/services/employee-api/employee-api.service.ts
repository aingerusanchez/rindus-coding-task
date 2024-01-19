// import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
// Mock data
import { MOCK_DATA } from './employee-mock.data';

// @Injectable({ providedIn: 'root' })
export class EmployeeApiService {
  constructor() {}

  getAll() {
    return of(MOCK_DATA).pipe(delay(3000));
  }
}
