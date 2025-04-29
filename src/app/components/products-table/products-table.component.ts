import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRowComponent } from '../product-row/product-row.component';
import { EditProductFormComponent } from '../edit-product-form/edit-product-form.component';
import { DeletePopupModalComponent } from '../delete-popup-modal/delete-popup-modal.component';
import { GraphModalComponent } from '../graph-modal/graph-modal.component';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.models';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ProductRowComponent,
    EditProductFormComponent,
    DeletePopupModalComponent,
    GraphModalComponent,
    SearchFilterComponent,
  ],
})
export class ProductsTableComponent {
  products: Product[] = [];
  loading: boolean = false;
  error: string = '';
  showEditModal: boolean = false;
  showDeleteModal: boolean = false;
  showGraphModal: boolean = false;
  editingProduct: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to fetch products.';
        this.loading = false;
      },
    });
  }

  onSearchProducts(name: string) {
    if (!name) {
      this.fetchProducts();
      return;
    }

    this.loading = true;
    this.productService.searchProductsByName(name).subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to search products.';
        this.loading = false;
      },
    });
  }

  onFilterProducts(filterData: {
    cost?: number;
    costOp?: string;
    sales?: number;
    salesOp?: string;
  }) {
    this.loading = true;
    this.productService.filterProducts(filterData).subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to filter products.';
        this.loading = false;
      },
    });
  }

  onResetProducts() {
    this.fetchProducts();
  }

  onEditProduct(product: Product) {
    this.editingProduct = product;
    this.showEditModal = true;
  }

  onDeleteProduct(product: Product) {
    this.editingProduct = product;
    this.showDeleteModal = true;
  }

  onGraphProduct(product: Product) {
    this.editingProduct = product;
    this.showGraphModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editingProduct = null;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.editingProduct = null;
  }

  closeGraphModal() {
    this.showGraphModal = false;
    this.editingProduct = null;
  }
}
