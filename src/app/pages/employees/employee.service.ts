import { Injectable, computed, inject, signal } from '@angular/core';
// RxJs
import { Observable, finalize, first } from 'rxjs';
// Services
import { EmployeeApiService } from '@core/services/employee-api/employee-api.service';
import { NotificationsService } from '@shared/services/notifications/notifications-service.service';
// Models
import { Employee, fullName } from '@core/models';
import { MatDialogData } from '@shared/components/dialog/dialog.component';

@Injectable()
export class EmployeeService {
  #employeesApi = inject(EmployeeApiService);
  #notificationsService = inject(NotificationsService);

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

  getEmployeeById(id: string): Employee | undefined {
    return this.#employeeSignal().find(
      (employee: Employee) => employee.id === +id
    );
  }

  create(newEmployee: Employee) {
    newEmployee.id = this.#employeeSignal().length + 1;

    this.#employeeSignal.update((employees) => [newEmployee, ...employees]);
  }

  update(updatedEmployee: Employee) {
    const index = this.#employeeSignal().findIndex(
      (emp: Employee) => emp.id === updatedEmployee.id
    );

    if (index > -1) {
      this.#employeeSignal.update((employees) => {
        employees.splice(index, 1, updatedEmployee);
        return [...employees];
      });
    }
  }

  delete(employeeToDelete: Employee) {
    this.deleteConfirm(employeeToDelete)
      .pipe(first())
      .subscribe((confirmation: boolean) => {
        if (!confirmation) return;

        this.performDelete(employeeToDelete);
      });
  }

  private performDelete(employeeToDelete: Employee) {
    const index = this.#employeeSignal().findIndex(
      (emp: Employee) => emp.id === employeeToDelete.id
    );

    if (index > -1) {
      this.#employeeSignal.update((employees) => {
        employees.splice(index, 1);
        return [...employees];
      });
    }
  }

  private deleteConfirm(employee: Employee): Observable<boolean> {
    const confirmData: MatDialogData = {
      title: 'Delete employee?',
      message: `Are you sure you want to delete ${fullName(employee)}?`,
      buttonOk: 'Delete',
      buttonCancel: 'Cancel',
    };

    return this.#notificationsService.openDialog(confirmData);
  }
}
