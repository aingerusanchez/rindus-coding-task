import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RoleService } from '@core/services/role.service';

export const roleGuard: CanActivateFn = () => {
  const role = inject(RoleService).role();
  return !!role ?? inject(Router).navigateByUrl('role-selector');
};
