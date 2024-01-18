import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
// Models
import { Role } from '@core/models';

@Injectable({ providedIn: 'root' })
export class RoleService {
  #router = inject(Router);

  role = signal<Role | undefined>(undefined);

  constructor() {
    this.initRole();
  }

  setRole(role: Role) {
    this.role.set(role);
    localStorage.setItem('role', role);
  }

  logout() {
    this.role.set(undefined);
    localStorage.removeItem('role');
    this.#router.navigate(['role-selector']);
  }

  private initRole() {
    const role = localStorage.getItem('role');
    if (role) {
      this.role.set(role as Role);
      this.#router.navigateByUrl('employee-list');
    } else {
      this.#router.navigateByUrl('role-selector');
    }
  }
}
