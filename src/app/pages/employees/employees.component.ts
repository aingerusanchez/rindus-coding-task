import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Providers
import { EmployeeApiService } from '@core/services/employee-api/employee-api.service';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styles: [],
  providers: [EmployeeApiService, EmployeeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesComponent {}
