import { Injectable, signal } from '@angular/core';
// RxJs
import { first } from 'rxjs';
// Services
import { EmployeeApiService } from '@core/services/employee-api/employee-api.service';
// Models
import { Employee } from '@core/models';

@Injectable()
export class EmployeeService {
  #employeeSignal = signal<Employee[]>([]);
  filteredEmployeesSignal = signal<Employee[]>([]);

  constructor(private employeesApi: EmployeeApiService) {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeesApi
      .getAll()
      .pipe(first())
      .subscribe({
        next: (employees: Employee[]) => {
          const employeesSlice = employees.splice(0, 10);
          console.table(employeesSlice);
          this.#employeeSignal.set(employeesSlice);
          this.filteredEmployeesSignal.set(employeesSlice);
        },
        error: (error: Error) => {
          console.error('Cannot load employees', error);
        },
      });
  }

  filterByNameOrSurname(search: string) {
    if (!search) {
      return;
    }

    this.filteredEmployeesSignal.set(
      this.filteredEmployeesSignal().filter(
        (employee) =>
          employee.name.toLowerCase().includes(search.toLowerCase()) ||
          employee.surname.toLowerCase().includes(search.toLowerCase())
      )
    );
  }

  resetFilter() {
    this.filteredEmployeesSignal.set(this.#employeeSignal());
  }
}
