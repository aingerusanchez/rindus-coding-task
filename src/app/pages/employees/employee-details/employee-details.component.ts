import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, delay, finalize, of, tap } from 'rxjs';
// Angular Material
import { MatCardModule } from '@angular/material/card';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
// Ngx-mask
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
// Services
import { EmployeeService } from '../employee.service';
// Environment
import { environment as env } from '@env/environment';
// Models
import { Employee, Position, fullName } from '@core/models';
// Pipes
import { AgePipe, FullNamePipe } from '@shared/pipes';
// Utils
import { capitalize } from '@shared/utils/string.utils';

interface EmployeeForm {
  name: FormControl<string | null>;
  surname: FormControl<string | null>;
  birthDate: FormControl<string | null>;
  position: FormControl<string | null>;
  altPos: FormControl<string | null>;
}

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Angular Material
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinner,
    // Pipes
    AgePipe,
    FullNamePipe,
    // Ngx-mask
    NgxMaskDirective,
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
  providers: [provideNgxMask()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailsComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private router = inject(Router);

  fullName = fullName;
  nameMinChars = env.employeeForm.name.minChars;
  nameMaxChars = env.employeeForm.name.maxChars;
  loading = signal(false);
  positionOptions$: Observable<string[]> = of(
    env.employeeForm.position.options
  ).pipe(
    tap(() => this.loading.set(true)),
    delay(env.simulatedDelayMs),
    finalize(() => {
      this.position?.enable();
      this.loading.set(false);
    })
  );
  dateConfig: { format: string; mask: string } = env.employeeForm.date;

  employee: Employee = {
    id: -1,
    name: '',
    surname: '',
    email: '',
    birthDate: '',
    position: '' as Position,
    altPos: '',
    avatar: 'assets/images/avatar.svg',
  };

  nameValidators = [
    Validators.required,
    Validators.minLength(this.nameMinChars),
    Validators.maxLength(this.nameMaxChars),
  ];

  formEmployee: FormGroup<EmployeeForm> = this.fb.group(
    {
      name: ['', [...this.nameValidators]],
      surname: ['', [...this.nameValidators]],
      birthDate: ['', Validators.required],
      position: [{ value: '', disabled: true }, Validators.required],
      altPos: [''],
    },
    { updateOn: 'blur' }
  );

  get name() {
    return this.formEmployee.get('name');
  }

  get surname() {
    return this.formEmployee.get('surname');
  }

  get birthDate() {
    return this.formEmployee.get('birthDate');
  }

  get position() {
    return this.formEmployee.get('position');
  }

  get altPos() {
    return this.formEmployee.get('altPos');
  }

  constructor(private fb: FormBuilder) {
    // Load employee data from state
    const employee =
      inject(Router).getCurrentNavigation()?.extras.state?.['employee'];

    if (employee?.id > -1) {
      this.formEmployee.patchValue(employee);
      this.employee = employee;
    } else {
      // Remove employee id from url
      inject(Location).replaceState('/employees/-1');
    }
  }

  ngOnInit() {
    this.listenToPositionChanges();
  }

  onSubmit() {
    this.formEmployee.updateValueAndValidity();
    if (this.formEmployee.invalid) return;

    const { name, surname, birthDate, position, altPos } =
      this.formEmployee.value;
    const employee: Employee = {
      id: this.employee.id,
      name: capitalize(name!.trim()),
      surname: capitalize(surname!.trim()),
      email: this.employee.email ?? '',
      birthDate: birthDate!,
      position: position! as Position,
      altPos: altPos!,
      avatar: this.employee.avatar,
    };

    if (this.employee.id > -1) {
      // Update existing employee
      this.employeeService.update(employee);
    } else {
      // Create new employee
      this.employeeService.create(employee);
    }
    this.router.navigate(['employees']);
  }

  goBack() {
    this.router.navigate(['employees']);
  }

  private listenToPositionChanges() {
    this.position?.valueChanges.subscribe((position) => {
      if (position === 'Other') {
        // Enable altPos making it required
        this.altPos?.setValidators([Validators.required]);
        this.altPos?.enable();
      } else {
        // Disable altPos, making it optional
        this.altPos?.disable();
        // Reset altPos value
        this.formEmployee.get('altPos')?.reset();
      }
      this.altPos?.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    });
  }
}
