import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
// Angular Material
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

export interface MatDialogData {
  title: string;
  message: string;
  buttonOk: string;
  buttonCancel: string;
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <div mat-dialog-content>{{ data.message }}</div>
    <div mat-dialog-actions align="end">
      <button mat-button mat-dialog-close (click)="cancel()">
        {{ data.buttonCancel }}
      </button>
      <button mat-button mat-dialog-close cdkFocusInitial (click)="confirm()">
        {{ data.buttonOk }}
      </button>
    </div>
  `,
  styles: [``],
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialogData
  ) {}

  cancel() {
    this.dialogRef.close();
  }

  confirm() {
    this.dialogRef.close(true);
  }
}
