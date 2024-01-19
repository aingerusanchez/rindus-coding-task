import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

export interface SnackBarData {
  message: string;
  icon?: string;
  action?: string;
}

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p>
      @if (data.icon) {
      <mat-icon>{{ data.icon }}</mat-icon>
      }
      <mat-label>{{ data.message }}</mat-label>
    </p>

    @if ( data.action ) {
    <button mat-button>{{ data.action }}</button>
    }
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      p {
        margin: 0;
        display: flex;
        align-items: center;

        mat-icon {
          margin-right: 6px;
        }
      }

      button {
        color: var(--accent) !important;
        font-weight: bold;
      }
    `,
  ],
})
export class SnackBarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData) {}
}
