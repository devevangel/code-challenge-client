import { Component, Output, Input, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.models';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-delete-popup-modal',
  imports: [CommonModule],
  templateUrl: './delete-popup-modal.component.html',
})
export class DeletePopupModalComponent {
  @Output() cancelModal = new EventEmitter<void>();
  @Output() deletedProduct = new EventEmitter<Product>();
  @Input() product!: Product;
  @Input() showDeleteModal: boolean = true;

  loading: boolean = false;
  error: string = '';

  constructor(private productService: ProductService) {}

  onDeleteProduct() {
    if (!this.product) return;

    this.loading = true;
    this.error = '';

    this.productService.deleteProduct(this.product.id).subscribe({
      next: () => {
        this.loading = false;
        this.deletedProduct.emit();
        this.cancelModal.emit();
      },
      error: (err) => {
        console.error('Error deleting product', err);
        this.error = 'Failed to delete product. Please try again.';
        this.loading = false;
      },
    });
  }

  onCancel() {
    this.cancelModal.emit();
  }
}
