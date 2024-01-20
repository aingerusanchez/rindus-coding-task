import { Injectable } from '@angular/core';
// RxJs
import { Observable, delay, map, of } from 'rxjs';
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
    return of(MOCK_DATA).pipe(
      delay(LOADING_TIME_MILI_SECONDS),
      // Adapt each employee avatar to other api
      map((employees: Employee[]) =>
        employees.map((employee: Employee) => ({
          ...employee,
          // Since only supply 70 avatar images, repite after 70
          // Reference employee id to relate user with same avatar consistently
          avatar: `https://i.pravatar.cc/150?img=${employee.id % 70}`,
        }))
      )
    );
  }
}
