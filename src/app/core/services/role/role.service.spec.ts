import { TestBed } from '@angular/core/testing';

import { RoleService } from './role.service';
import { Router } from '@angular/router';

describe('RoleService', () => {
  let roleService: RoleService;
  let routerSpy: Router;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerSpy }],
    });
    roleService = TestBed.inject(RoleService);
  });

  beforeEach(() => {
    // Initialization
    localStorage.removeItem('role');
  });

  it('should be created', () => {
    expect(roleService).toBeTruthy();
  });

  it('should change role', () => {
    // Initial has not role
    expect(roleService.role()).toBeUndefined();
    expect(localStorage.getItem('role')).toBeNull();
    // Change to 'admin' role
    roleService.setRole('admin');
    expect(roleService.role()).toEqual('admin');
    expect(localStorage.getItem('role')).toEqual('admin');
    // Change to 'user' role
    roleService.setRole('user');
    expect(roleService.role()).toEqual('user');
    expect(localStorage.getItem('role')).toEqual('user');
  });

  it('should wipe all role data when logout', () => {
    roleService.logout();
    expect(roleService.role()).toEqual(undefined);
    expect(localStorage.getItem('role')).toBeNull();
    // Redirect to role-selector page
    expect(routerSpy.navigate).toHaveBeenCalledWith(['role-selector']);
  });
});
