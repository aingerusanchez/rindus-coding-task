import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
// Models
import { Role } from '@core/models';

@Injectable({ providedIn: 'root' })
export class RoleService {
  #router = inject(Router);

  role = signal<Role | undefined>(undefined);

  isAdmin = computed(() => {
    return this.role() === 'admin';
  });

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
    const role = localStorage.getItem('role') as Role;

    if (role === 'user' || role === 'admin') {
      this.role.set(role as Role);
      // this.#router.navigateByUrl('employee-list');
    }
  }
}
