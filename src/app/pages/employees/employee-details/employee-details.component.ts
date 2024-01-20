import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailsComponent {
  employee = signal({});

  constructor() {
    const employee =
      inject(Router).getCurrentNavigation()?.extras.state?.['employee'];
    this.employee.set(employee);
    console.log('data: ', this.employee());
  }
}
