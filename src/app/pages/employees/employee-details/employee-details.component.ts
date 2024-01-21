import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
    // Pipes
    AgePipe,
    FullNamePipe,
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailsComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  fullName = fullName;
  nameMinChars = env.employeeForm.name.minChars;
  nameMaxChars = env.employeeForm.name.maxChars;
  positionOptions: string[] = env.employeeForm.position.options;
  employee: Employee;

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
      position: [env.employeeForm.position.options[0], Validators.required],
      altPos: [
        '',
        // requiredIfValidator(
        //   () => this.formEmployee.get('position')?.value === 'Other'
        // ),
      ],
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
    // Load employee data
    this.employee =
      inject(Router).getCurrentNavigation()?.extras.state?.['employee'];

    if (this.employee?.id > -1) {
      this.formEmployee.patchValue(this.employee);
    } else {
      this.employee = {
        id: -1,
        name: '',
        surname: '',
        email: '',
        birthDate: '',
        position: this.positionOptions[0] as Position,
        altPos: '',
        avatar: 'assets/images/avatar.svg',
      };
    }
  }

  ngOnInit() {
    this.listenToPositionChanges();
  }

  onSubmit() {
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

  private listenToPositionChanges() {
    this.position?.valueChanges.subscribe((position) => {
      if (position === 'Other') {
        // Make altPos required
        this.altPos?.setValidators([Validators.required]);
      } else {
        // Make altPos optional
        this.altPos?.hasValidator(Validators.required) ??
          this.altPos?.clearValidators();
        // Reset altPos value
        this.formEmployee.get('altPos')?.reset();
      }
      this.altPos?.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    });
  }
}

// function requireIfPositionIsOther(formControl: AbstractControl) {
//   if (!formControl.parent) return null;
//   if (formControl.parent.get('position')?.value !== 'Other') return null;

//   return Validators.required(formControl);
// }

// function requiredIfValidator(predicate: () => boolean) {
//   return (formControl: AbstractControl) => {
//     if (!formControl.parent) {
//       return null;
//     }
//     if (predicate()) {
//       return Validators.required(formControl);
//     }
//     return null;
//   };
// }
