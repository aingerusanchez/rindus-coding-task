import { Injectable } from '@angular/core';
// RxJs
import { Observable, delay, of } from 'rxjs';
// Mock data
import { MOCK_DATA } from './employee-mock.data';
// Models
import { Employee } from '@core/models';

const LOADING_TIME_MILI_SECONDS = 3000;

@Injectable()
export class EmployeeApiService {
  constructor() {}

  /**
   * The getAll function returns an Observable that emits employee data array after a delay of
   * `${LOADING_TIME_MILI_SECONDS}` milliseconds.
   * @returns `Observable<Employee[]>`
   */
  getAll(): Observable<Employee[]> {
    // Simulates data fetch from backend
    return of(MOCK_DATA).pipe(delay(LOADING_TIME_MILI_SECONDS));
  }
}
