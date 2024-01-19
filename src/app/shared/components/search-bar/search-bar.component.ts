import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
// Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatMenuModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-form-field appearance="outline">
      <mat-label for="search-input">{{ placeholder() }}</mat-label>
      <mat-icon matPrefix>search</mat-icon>
      <input
        #searchInput
        id="search-input"
        matInput
        type="search"
        [placeholder]="placeholder()"
        (input)="type.emit($any($event.target).value)"
      />
      <!-- @if (options().length) {
      <button
        #optionsButton
        matSuffix
        mat-button
        class="options-menu"
        [matMenuTriggerFor]="menu"
        (click)="showOptions($any($event.target).value)"
      >
        {{ selectedOption() || 'Search by' }}
      </button>
      }  -->
      @if (hint()) {
      <mat-hint align="start"> {{ hint() }} </mat-hint>
      }
    </mat-form-field>

    <!-- @if (options().length) {
    <mat-menu #menu="matMenu">
      @for (option of options(); track $index) {
      <button mat-menu-item (click)="changeOption(option)">{{ option }}</button>
      }
    </mat-menu>
    } -->
  `,
  styles: [
    `
      :host {
        width: 100%;
        position: relative;
      }

      mat-form-field {
        min-width: 200px;
        width: clamp(200px, 100%, 100%);
        display: flex;

        // Remove autofill background
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          transition: background-color 5000s;
          background: transparent;
        }

        input,
        label {
          display: block;
          // max-width: 90%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;

          &.mat-form-field-autofilled {
            background: red;
          }
        }

        // .options-menu {
        //   padding-right: 35px;
        //   // margin-right: 12px;
        //   text-wrap: nowrap;

        //   &::after {
        //     border-left: 5px solid transparent;
        //     border-right: 5px solid transparent;
        //     border-top: 5px solid;
        //     content: '';
        //     position: absolute;
        //     right: 16px;
        //     top: 50%;
        //     -webkit-transform: translateY(-50%);
        //     transform: translateY(-50%);
        //   }
        // }

        mat-hint {
          margin: 6px 0 0 32px;
          font-size: 0.8rem;
        }
      }

      :host ::ng-deep .mat-form-field-underline {
        background-color: white !important;
      }
      :host
        ::ng-deep
        .mat-focused
        .mat-form-field-underline
        .mat-form-field-ripple {
        background-color: white !important;
      }

      ::ng-deep input.mat-input-element {
        color: white;
      }
    `,
  ],
})
export class SearchBarComponent {
  placeholder = input('Search');
  hint = input('');
  // options = input<string[]>([]);
  @Output() type: EventEmitter<string> = new EventEmitter<string>();

  // selectedOption = signal<string>(this.options()?.[0]);

  constructor() {
    // Initialize selected option
    /* effect(
      () => {
        if (!this.selectedOption() && this.options().length) {
          this.selectedOption.set(this.options()[0]);
        }
      },
      {
        allowSignalWrites: true,
      }
    ); */
  }

  /* showOptions(option: string) {
    console.log(option);
  }

  changeOption(item: string) {
    this.selectedOption.set(item);
  } */
}
