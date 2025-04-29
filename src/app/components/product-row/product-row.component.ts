import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.models';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'tr[app-product-row]',
  templateUrl: './product-row.component.html',
  imports: [CommonModule],
  standalone: true,
})
export class ProductRowComponent {
  @Input() product!: Product;
  @Input() index!: number;

  @Output() editProduct = new EventEmitter<Product>();
  @Output() deleteProduct = new EventEmitter<Product>();
  @Output() graphProduct = new EventEmitter<Product>();

  onEditProduct() {
    this.editProduct.emit(this.product);
  }

  onDeleteProduct() {
    this.deleteProduct.emit(this.product);
  }

  onViewGraph() {
    this.graphProduct.emit(this.product);
  }
}
