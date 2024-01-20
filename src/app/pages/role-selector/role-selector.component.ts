import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// Services
import { RoleService } from '@core/services/role/role.service';
// Models
import { Role } from '@core/models';

@Component({
  selector: 'app-role-selector',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './role-selector.component.html',
  styleUrl: './role-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleSelectorComponent {
  #roleService = inject(RoleService);
  #router = inject(Router);

  userRole: Role = 'user';

  enter() {
    if (!this.userRole) return;

    this.#roleService.setRole(this.userRole);
    this.#router.navigate(['employees']);
  }
}
