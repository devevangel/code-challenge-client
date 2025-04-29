import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductFormComponent } from '../../components/create-product-form/create-product-form.component';

@Component({
  selector: 'app-create-product-page',
  imports: [CommonModule, CreateProductFormComponent],
  templateUrl: './create-product-page.component.html',
})
export class CreateProductPageComponent {}
