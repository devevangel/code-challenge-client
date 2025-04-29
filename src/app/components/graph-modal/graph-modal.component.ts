import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { Product } from '../../models/product.models';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-graph-modal',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './graph-modal.component.html',
})
export class GraphModalComponent implements OnInit {
  // ✅ added OnInit
  @Input() showGraphModal: boolean = false;
  @Input() product!: Product;
  @Output() cancelModal = new EventEmitter<void>();

  products: Product[] = [];
  loading: boolean = false;
  error: string = '';

  barChartType: ChartType = 'bar';
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [],
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        grid: { color: '#eee' },
      },
    },
    plugins: {
      legend: { display: true, position: 'top' },
    },
  };

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.loading = true;
    this.error = '';
    this.productService.getProducts().subscribe({
      next: (response: Product[]) => {
        this.products = response;
        this.updateChart(); // ✅ update chart after fetching products
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching products', err);
        this.error = 'Failed to load products.';
        this.loading = false;
      },
    });
  }

  updateChart() {
    this.barChartData = {
      labels: this.products.map((p) => p.name),
      datasets: [
        {
          label: 'Total Sales ($)',
          data: this.products.map((p) => p.totalSales),
          backgroundColor: '#60A5FA',
        },
      ],
    };
  }

  onCancel() {
    this.cancelModal.emit();
  }
}
