import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-filter.component.html',
})
export class SearchFilterComponent {
  @Output() search = new EventEmitter<string>();
  @Output() filter = new EventEmitter<{
    cost?: number;
    costOp?: string;
    sales?: number;
    salesOp?: string;
  }>();
  @Output() reset = new EventEmitter<void>();

  searchTerm: string = '';
  filterField: 'cost' | 'sales' | '' = '';
  filterOperator: 'gt' | 'lt' | 'gte' | 'lte' | '' = '';
  filterValue: string = '';

  onSearch() {
    if (this.searchTerm.trim()) {
      this.search.emit(this.searchTerm.trim());
    }
  }

  onFilter() {
    if (
      !this.filterField ||
      !this.filterOperator ||
      this.filterValue === null ||
      this.filterValue === undefined ||
      this.filterValue === ''
    ) {
      return;
    }

    const valueAsNumber = Number(this.filterValue);

    if (isNaN(valueAsNumber)) {
      return;
    }

    const filterPayload: {
      cost?: number;
      costOp?: string;
      sales?: number;
      salesOp?: string;
    } = {};

    if (this.filterField === 'cost') {
      filterPayload.cost = valueAsNumber;
      filterPayload.costOp = this.filterOperator;
    } else if (this.filterField === 'sales') {
      filterPayload.sales = valueAsNumber;
      filterPayload.salesOp = this.filterOperator;
    }

    this.filter.emit(filterPayload);
  }

  onReset() {
    this.searchTerm = '';
    this.filterField = 'cost';
    this.filterOperator = 'gt';
    this.filterValue = '';
    this.reset.emit();
  }
}
