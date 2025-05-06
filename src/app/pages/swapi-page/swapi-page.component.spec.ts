import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwapiPageComponent } from './swapi-page.component';
import { SwapiService } from '../../services/swapi.service';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { IPerson, Product } from '../../models/product.models';
import { CommonModule } from '@angular/common';

fdescribe('SwapiPageComponent', () => {
  let component: SwapiPageComponent;
  let fixture: ComponentFixture<SwapiPageComponent>;
  let swapiServiceSpy: jasmine.SpyObj<SwapiService>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const swapiMock = jasmine.createSpyObj('SwapiService', ['getPersons']);
    const productMock = jasmine.createSpyObj('ProductService', [
      'createProduct',
    ]);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [SwapiPageComponent, CommonModule],
      providers: [
        { provide: SwapiService, useValue: swapiMock },
        { provide: ProductService, useValue: productMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SwapiPageComponent);
    component = fixture.componentInstance;
    swapiServiceSpy = TestBed.inject(
      SwapiService
    ) as jasmine.SpyObj<SwapiService>;
    productServiceSpy = TestBed.inject(
      ProductService
    ) as jasmine.SpyObj<ProductService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch persons on init', () => {
    const mockPersons: IPerson[] = [
      {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        birth_year: '19BBY',
        url: 'https://swapi.dev/api/people/1/',
        hair_color: '',
        skin_color: '',
        eye_color: '',
        gender: '',
        homeworld: '',
        films: [],
        species: [],
        vehicles: [],
        starships: [],
        created: '',
        edited: '',
      },
    ];

    swapiServiceSpy.getPersons.and.returnValue(of(mockPersons));

    component.ngOnInit();

    expect(swapiServiceSpy.getPersons).toHaveBeenCalled();
    expect(component.persons).toEqual(mockPersons);
  });

  it('should call createProduct and navigate on import', () => {
    const mockPerson: IPerson = {
      name: 'Leia Organa',
      height: '150',
      mass: '49',
      birth_year: '19BBY',
      url: 'https://swapi.dev/api/people/5/',
      hair_color: '',
      skin_color: '',
      eye_color: '',
      gender: '',
      homeworld: '',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '',
      edited: '',
    };

    const expectedProduct: Product = {
      id: mockPerson.url,
      name: mockPerson.name,
      unitCost: 300,
      totalSales: 147,
      inventory: 600,
      description: `${mockPerson.name} is a character from Star Wars, They were born on ${mockPerson.birth_year}.`,
      imageUrl: 'http://dummyimage.com/202x100.png/dddddd/000000',
    };

    productServiceSpy.createProduct.and.returnValue(of(expectedProduct));

    component.onImportPerson(mockPerson);

    expect(productServiceSpy.createProduct).toHaveBeenCalledWith(
      expectedProduct
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should show alert on import failure', () => {
    spyOn(window, 'alert');

    const mockPerson: IPerson = {
      name: 'Han Solo',
      height: '180',
      mass: '80',
      birth_year: '29BBY',
      url: 'https://swapi.dev/api/people/14/',
      hair_color: '',
      skin_color: '',
      eye_color: '',
      gender: '',
      homeworld: '',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '',
      edited: '',
    };

    productServiceSpy.createProduct.and.returnValue(
      throwError(() => ({ error: { message: 'Failed to import' } }))
    );

    component.onImportPerson(mockPerson);

    expect(window.alert).toHaveBeenCalledWith('Failed to import');
  });
});
