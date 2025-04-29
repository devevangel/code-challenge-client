import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-product-form.component.html',
})
export class CreateProductFormComponent {
  errorMessage: string = '';
  productForm: FormGroup;
  loading: boolean = false;

  constructor(private productService: ProductService, private router: Router) {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      unitCost: new FormControl('', [Validators.required, Validators.min(0)]),
      totalSales: new FormControl('', [Validators.required, Validators.min(0)]),
      inventory: new FormControl('', [Validators.required, Validators.min(0)]),
      imageUrl: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  onSubmit() {
    this.errorMessage = '';
    if (this.productForm.valid) {
      this.loading = true;
      const preparedData = {
        ...this.productForm.value,
        unitCost: Number(this.productForm.value.unitCost),
        totalSales: Number(this.productForm.value.totalSales),
        inventory: Number(this.productForm.value.inventory),
      };

      this.productService.createProduct(preparedData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/products']);
        },
        error: (err) => {
          this.errorMessage = 'Failed to create product. Please try again.';
          this.loading = false;
        },
      });
    } else {
      this.errorMessage = 'Please correct the errors in the form.';
      this.productForm.markAllAsTouched();
    }
  }

  onReset() {
    this.errorMessage = '';
    this.productForm.reset();
  }
}
