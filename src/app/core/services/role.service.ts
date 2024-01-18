import { Injectable, signal } from '@angular/core';
// Models
import { Role } from '@core/models';

@Injectable({ providedIn: 'root' })
export class RoleService {
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
  }

  private initRole() {
    localStorage.getItem('role');
  }
}
