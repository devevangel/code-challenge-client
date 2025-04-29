import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchFilterComponent } from './search-filter.component';
import { FormsModule } from '@angular/forms';

fdescribe('SearchFilterComponent', () => {
  let component: SearchFilterComponent;
  let fixture: ComponentFixture<SearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFilterComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit search event when search button clicked', () => {
    const searchSpy = spyOn(component.search, 'emit');

    component.searchTerm = 'Laptop';
    component.onSearch();

    expect(searchSpy).toHaveBeenCalledWith('Laptop');
  });

  it('should emit filter event when filter button clicked', () => {
    const filterSpy = spyOn(component.filter, 'emit');

    component.filterField = 'cost';
    component.filterOperator = 'gte';
    component.filterValue = '100';

    component.onFilter();

    expect(filterSpy).toHaveBeenCalledWith({
      cost: 100,
      costOp: 'gte',
    });
  });

  it('should emit reset event when reset button clicked', () => {
    const resetSpy = spyOn(component.reset, 'emit');

    component.onReset();

    expect(resetSpy).toHaveBeenCalled();
  });
});
