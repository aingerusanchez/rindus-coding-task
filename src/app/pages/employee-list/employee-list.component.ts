import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
// Angular Material
import { MatListModule } from '@angular/material/list';
import { EmployeeApiService } from '@core/services/employee-api/employee-api.service';
// Components
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';
// import { interval } from 'rxjs';

const SEARCH_MIN_CHARS = 3;

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatListModule, SearchBarComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  providers: [EmployeeApiService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent implements OnInit {
  #employeeApiService = inject(EmployeeApiService);

  searchHint = signal('Enter at least 3 characters');

  ngOnInit(): void {
    /* const interval$ = interval(1000);
    let seconds = 0;
    // Subscribe to the observable to consume its values
    interval$.subscribe(() => {
      seconds++;
      console.log(seconds); // Output the emitted value
    }); */
    this.#employeeApiService.getAll().subscribe(console.table);
  }

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
