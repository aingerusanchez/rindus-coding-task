import { Injectable, inject } from '@angular/core';
// Angular Material
import { MatSnackBar } from '@angular/material/snack-bar';
// Components
import { SnackBarComponent } from '@shared/components/snack-bar/snack-bar.component';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  #snackBar = inject(MatSnackBar);

  showSnackBar(message: string, icon?: string, action?: string) {
    this.#snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message,
        icon,
        action,
      },
    });
  }
}
