import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const QUERY_MIN_LENGTH = 3;

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchbarComponent {
  @Input() placeholder: string = 'Search';
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  searchForm: FormGroup;
  submitted = false;

  get query(): AbstractControl<string> | null {
    return this.searchForm.get('username');
  }

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      query: ['', [Validators.minLength(QUERY_MIN_LENGTH)]],
    });

    // Avoid white spaces in the username input
    this.query?.valueChanges.subscribe((value) =>
      this.query?.setValue(value.trim(), { emitEvent: false })
    );
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.searchForm.valid && this.query?.value) {
      this.search.emit(this.query?.value);
    }
  }
}
