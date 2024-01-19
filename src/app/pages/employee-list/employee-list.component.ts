import { ChangeDetectionStrategy, Component } from '@angular/core';
// Angular Material
import { MatListModule } from '@angular/material/list';
// Components
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatListModule, SearchBarComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent {
  onSearch(query: string) {
    console.log('query:', query);
  }
}
