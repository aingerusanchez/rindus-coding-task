import { Injectable, inject } from '@angular/core';
// Angular Material
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  #snackBar = inject(MatSnackBar);

  showSnackBar(message: string, action?: string, config?: MatSnackBarConfig) {
    this.#snackBar.open(message, action, config);
  }
}
