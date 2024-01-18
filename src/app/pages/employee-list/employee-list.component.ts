import { ChangeDetectionStrategy, Component } from '@angular/core';
// Angular Material
import { MatListModule } from '@angular/material/list';
// Components
import { SearchbarComponent } from '@shared/components/searchbar/searchbar.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatListModule, SearchbarComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent {
  onSearch(query: string) {
    console.log('query:', query);
  }
}
