import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RoleService } from '@core/services/role.service';
import { NotificationsService } from '@shared/services/notifications-service.service';

export const roleGuard: CanActivateFn = () => {
  const role = inject(RoleService).role();

  if (role === 'user' || role === 'admin') {
    return true;
  } else {
    inject(NotificationsService).showSnackBar('You must select a valid role');
    return inject(Router).navigateByUrl('role-selector');
  }
};
