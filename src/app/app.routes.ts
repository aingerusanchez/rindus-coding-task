import { Routes } from '@angular/router';
// Guards
import { roleGuard } from '@core/guards';

export const routes: Routes = [
  {
    title: 'Role selector',
    path: 'role-selector',
    loadComponent: () =>
      import('./pages/role-selector/role-selector.component').then(
        (m) => m.RoleSelectorComponent
      ),
  },
  {
    path: 'employees',
    canActivate: [roleGuard],
    children: [
      {
        title: 'Employee list',
        path: '',
        loadComponent: () =>
          import(
            './pages/employees/employee-list/employee-list.component'
          ).then((m) => m.EmployeeListComponent),
      },
      {
        title: 'Employee details',
        path: ':id',
        loadComponent: () =>
          import(
            './pages/employees/employee-details/employee-details.component'
          ).then((m) => m.EmployeeDetailsComponent),
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'role-selector',
  },
  {
    path: '**',
    redirectTo: 'role-selector',
  },
];
