import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPerson } from '../../models/product.models';
import { SwapiService } from '../../services/swapi.service';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-swapi-page',
  imports: [CommonModule],
  templateUrl: './swapi-page.component.html',
})
export class SwapiPageComponent {
  persons: IPerson[] = [];

  constructor(
    private swapiService: SwapiService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.onGetPersons();
  }

  onGetPersons() {
    this.swapiService
      .getPersons()
      .subscribe((response: IPerson[]) => (this.persons = response));
  }

  onImportPerson(person: IPerson) {
    const newPersonProduct = {
      id: person.url,
      name: person.name,
      unitCost: Number(person.height) * 2,
      totalSales: Number(person.mass) * 3,
      inventory: Number(person.height) * 4,
      description: `${person.name} is a character from Star Wars, They were born on ${person.birth_year}.`,
      imageUrl: 'http://dummyimage.com/202x100.png/dddddd/000000',
    };

    this.productService.createProduct(newPersonProduct).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: (err) => {
        const { message } = err.error;
        alert(message);
      },
    });
  }
}
