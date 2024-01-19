import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
// Angular Material
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
// Service
import { EmployeeApiService } from '@core/services/employee-api/employee-api.service';
import { EmployeeService } from './employee.service';
// Components
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';
// Pipes
import { AgePipe } from '@shared/pipes/age.pipe';
// Models
import { Employee } from '@core/models';

const SEARCH_MIN_CHARS = 3;
const DEFAULT_ITEMS_PER_PAGE = 10;

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatSort,
    MatPaginator,
    MatPaginatorModule,
    SearchBarComponent,
    AgePipe,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  providers: [EmployeeApiService, EmployeeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent implements AfterViewInit {
  private employeesService = inject(EmployeeService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchHint = signal('Enter at least 3 characters');
  #employees = this.employeesService.filteredEmployeesSignal;
  employeesDataSource = computed(
    () => new MatTableDataSource<Employee>(this.#employees())
  );
  displayedColumns: string[] = ['avatar', 'name', 'surname', 'birthDate'];
  currentPage = signal<number>(1);
  itemsPerPage = signal<number>(DEFAULT_ITEMS_PER_PAGE);

  constructor() {}

  ngAfterViewInit() {
    this.employeesDataSource().paginator = this.paginator;
    this.employeesDataSource().sort = this.sort;
  }

  onSearchChange(query: string) {
    const searchText = query.trim().length;
    // Search text must have at least ${SEARCH_MIN_CHARS} characters
    if (searchText < SEARCH_MIN_CHARS) {
      this.searchHint.set(`Enter at least ${SEARCH_MIN_CHARS} characters`);
      // Clean filtered data
      this.employeesService.resetFilter();
      return;
    }

    this.searchHint.set('');
    console.log('query:', query);

    this.employeesService.filterByNameOrSurname(query);
  }

  handlePageChange(pageEvent: PageEvent) {
    console.log('handlePageChange: ', pageEvent);
  }
}
