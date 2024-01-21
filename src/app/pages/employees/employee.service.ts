import { Injectable, computed, inject, signal } from '@angular/core';
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
  filteredEmployeesSignal = computed(() => this.filterByNameOrSurname());

  #searchQuery = signal('');
  setFilter(query: string) {
    this.#searchQuery.set(query);
  }
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
        },
        error: (error: Error) => {
          console.error('Cannot load employees', error);
        },
      });
  }

  filterByNameOrSurname() {
    if (!this.#searchQuery()) {
      return this.#employeeSignal();
    }

    return this.#employeeSignal().filter(
      (employee) =>
        employee.name
          .toLowerCase()
          .includes(this.#searchQuery().toLowerCase()) ||
        employee.surname
          .toLowerCase()
          .includes(this.#searchQuery().toLowerCase())
    );
  }

  resetFilter() {
    this.loading.set(true);
    this.setFilter('');
    this.loading.set(false);
  }
}
