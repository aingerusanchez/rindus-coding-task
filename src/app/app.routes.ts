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
    title: 'Employee list',
    path: 'employee-list',
    loadComponent: () =>
      import('./pages/employee-list/employee-list.component').then(
        (m) => m.EmployeeListComponent
      ),
    canActivate: [roleGuard],
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
