import { Injectable, inject, signal } from '@angular/core';
// RxJs
import { finalize, first } from 'rxjs';
// Services
import { EmployeeApiService } from '@core/services/employee-api/employee-api.service';
// Models
import { Employee } from '@core/models';

@Injectable()
export class EmployeeService {
  #employeesApi = inject(EmployeeApiService);
  #employeeSignal = signal<Employee[]>([]);
  filteredEmployeesSignal = signal<Employee[]>([]);

  loading = signal(false);

  constructor() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.loading.set(true);
    this.#employeesApi
      .getAll()
      .pipe(
        first(),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (employees: Employee[]) => {
          const employeesSlice = employees.splice(0, 20);
          // console.table(employeesSlice);
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
    this.loading.set(true);
    this.filteredEmployeesSignal.set(this.#employeeSignal());
    this.loading.set(false);
  }
}
