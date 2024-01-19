import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// Environment
import { environment as env } from '@env/environment.development';
// Services
import { RoleService } from '@core/services/role/role.service';
// Components
import { HeaderComponent } from '@shared/layouts/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  #auth = inject(RoleService);

  title: string = env.title;

  onLogout = () => this.#auth.logout();
}
