import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.models';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-edit-product-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-product-form.component.html',
})
export class EditProductFormComponent {
  @Input() showEditModal: boolean = false;
  @Input() product!: Product;
  @Output() closeModal = new EventEmitter<void>();
  @Output() productUpdated = new EventEmitter<void>();

  errorMessage: string = '';
  productForm: FormGroup;
  loading: boolean = false;

  constructor(private productService: ProductService) {
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

  ngOnChanges() {
    if (this.product) {
      this.productForm.patchValue(this.product);
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const preparedData = {
        ...this.productForm.value,
        id: this.product.id,
        unitCost: Number(this.productForm.value.unitCost),
        totalSales: Number(this.productForm.value.totalSales),
        inventory: Number(this.productForm.value.inventory),
      };
      this.loading = true;

      this.productService.updateProduct(preparedData).subscribe({
        next: () => {
          this.loading = false;
          this.closeModal.emit();
          this.productUpdated.emit();
        },
        error: (err) => {
          this.errorMessage = 'Failed to update product. Please try again.';
          this.loading = false;
        },
      });
    } else {
      this.errorMessage = 'Please fix errors.';
      this.productForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.closeModal.emit();
  }
}
