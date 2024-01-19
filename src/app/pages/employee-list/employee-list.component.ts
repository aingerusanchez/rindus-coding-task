import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
// Angular Material
import { MatListModule } from '@angular/material/list';
// Components
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';

const SEARCH_MIN_CHARS = 3;

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatListModule, SearchBarComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent {
  searchHint = signal('Enter at least 3 characters');

  onSearchChange(query: string) {
    // Search text must have at least ${SEARCH_MIN_CHARS} characters
    if (query.trim().length < SEARCH_MIN_CHARS) {
      this.searchHint.set(`Enter at least ${SEARCH_MIN_CHARS} characters`);
      // Clean filtered data
      return;
    }

    this.searchHint.set('');
    console.log('query:', query);
  }
}
