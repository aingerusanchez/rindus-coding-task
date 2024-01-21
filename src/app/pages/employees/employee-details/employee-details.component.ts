import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// Angular Material
import { MatCardModule } from '@angular/material/card';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// Models
import { Employee, fullName } from '@core/models';
// Environment
import { environment as env } from '@env/environment';

const NEW_EMPLOYEE: Employee = {
  id: 0,
  avatar: 'assets/images/avatar.svg',
  name: '',
  surname: '',
  email: '',
  birthDate: '',
  position: 'Junior',
};

/* interface EmployeeForm {
  name: FormControl<string>;
  surname: FormControl<string>;
  birthDate: FormControl<string>;
  position: FormControl<string>;
  altPos: FormControl<string>;
} */

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Angular Material
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailsComponent {
  fullName = fullName;
  nameMinChars = env.employeeForm.name.minChars;
  nameMaxChars = env.employeeForm.name.maxChars;

  formEmployee: FormGroup = new FormGroup({});

  get name() {
    return this.formEmployee.get('name');
  }

  get surname() {
    return this.formEmployee.get('surname');
  }

  get avatar() {
    return this.formEmployee.get('avatar');
  }

  constructor(private fb: FormBuilder) {
    // Load employee data
    let employee =
      inject(Router).getCurrentNavigation()?.extras.state?.['employee'];
    console.log('employee: ', employee);

    if (!employee?.id) employee = NEW_EMPLOYEE; // Init new employee

    // Init form with employee data
    this.initForm(employee);
  }

  onSubmit() {
    if (this.formEmployee.valid) {
      // const { name, surname, birthDate, position, altPos } = this.employeeForm.value;
      console.log('Employee form: ', this.formEmployee.value);
    }
  }

  private initForm(employee: Employee) {
    const nameValidators: Validators[] = [
      Validators.required,
      Validators.minLength(this.nameMinChars),
      Validators.maxLength(this.nameMaxChars),
    ];

    this.formEmployee = this.fb.group({
      name: [employee.name, [...nameValidators]],
      surname: [employee.surname, [...nameValidators]],
      avatar: [employee.avatar],
      birthDate: [employee.birthDate, Validators.required],
      position: [employee.position, Validators.required],
      altPos: [employee.altPos],
    });
  }
}
