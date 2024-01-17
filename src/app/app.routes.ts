import { Routes } from '@angular/router';

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
    path: '',
    pathMatch: 'full',
    redirectTo: 'role-selector',
  },
  {
    path: '**',
    redirectTo: 'role-selector',
  },
];
