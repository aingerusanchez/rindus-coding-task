import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { EmployeeListComponent } from './employee-list.component';
import { EmployeeApiService } from '@core/services/employee-api/employee-api.service';
import { EmployeeService } from '../employee.service';
import { RoleService } from '@core/services/role/role.service';
import { Employee } from '@core/models';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let employeeServiceSpy: jasmine.SpyObj<EmployeeService>;
  let employeeApiServiceSpy: jasmine.SpyObj<EmployeeApiService>;
  // let roleService: jasmine.SpyObj<RoleService>;

  beforeEach(async () => {
    employeeServiceSpy = jasmine.createSpyObj('EmployeeService', [
      'resetFilter',
    ]);
    employeeApiServiceSpy = jasmine.createSpyObj('EmployeeApiService', [
      'getAll',
    ]);

    await TestBed.configureTestingModule({
      imports: [CommonModule, EmployeeListComponent],
      providers: [
        { provide: EmployeeService, useValue: employeeServiceSpy },
        {
          provide: EmployeeApiService,
          useValue: employeeApiServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete employee when employee has "admin" role', function () {
    pending();

    // spyOn(roleService, 'isAdmin').and.returnValue(true);
    // spyOn(employeeServiceSpy, 'delete');

    // const event = new Event('click');
    // const employee: Employee = {
    //   id: 1,
    //   avatar: 'avatar-url',
    //   name: 'John',
    //   surname: 'Smith',
    //   email: 'john.smith@example.com',
    //   birthDate: '01/01/1990',
    //   position: 'Senior',
    // };

    // component.deleteEmployee(event, employee);

    // expect(component.roleService.isAdmin).toHaveBeenCalled();
    // expect(employeeServiceSpy.delete).not.toHaveBeenCalled();
  });

  it('should display "Create new" button when user has "admin" role', function () {
    pending();

    // spyOn(roleService, 'isAdmin').and.returnValue(true);
  });
});
