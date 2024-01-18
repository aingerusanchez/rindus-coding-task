import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// Models
import { Role } from '@core/models';
import { RoleService } from '@core/services/role.service';

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

  userRole: Role = 'user';

  enter() {
    if (!this.userRole) return;

    this.#roleService.setRole(this.userRole);
  }
}
