import { Injectable, inject } from '@angular/core';
// Angular Material
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
// Components
import { SnackBarComponent } from '@shared/components/snack-bar/snack-bar.component';
import { Observable } from 'rxjs';
import {
  DialogComponent,
  MatDialogData,
} from '../components/dialog/dialog.component';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  #snackBar = inject(MatSnackBar);
  #dialog = inject(MatDialog);

  /**
   * ## LOW LEVEL OF INTERRUPTION
   *
   * The function `showSnackBar` opens a snackbar with a message, an optional icon, and an optional
   * action.
   * @param {string} message - A string that represents the message to be displayed in the snackbar.
   * @param {string} icon - (optional) MatIcon name from [Material Symbols](https://fonts.google.com/icons)
   * @param {string} action - (optional) Action label to display in the snackbar.
   */
  showSnackBar(message: string, icon?: string, action?: string) {
    this.#snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message,
        icon,
        action,
      },
    });
  }

  /**
   * The function opens a dialog using MatDialog and returns an Observable that emits a boolean value
   * when the dialog is closed indicating if the user confirms the action.
   * @param {MatDialogData} data -
   * - `title`: The title of the dialog.
   * - `message`: The message to be displayed in the dialog.
   * - `buttonOk`: The text of the "Confirm" button.
   * - `buttonCancel`: The text of the "Cancel" button.
   * @returns The response of the user as `Observable<boolean>`.
   */
  openDialog(data: MatDialogData): Observable<boolean> {
    const dialogRef = this.#dialog.open(DialogComponent, {
      data,
    });

    return dialogRef.afterClosed();
  }
}
