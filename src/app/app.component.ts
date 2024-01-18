import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// Environment
import { environment as env } from '@env/environment.development';
// Services
import { AuthService } from '@core/services/auth.service';
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
  #auth = inject(AuthService);

  title: string = env.title;

  onLogout = () => this.#auth.logout();
}
