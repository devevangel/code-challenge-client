import { Routes } from '@angular/router';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { CreateProductPageComponent } from './pages/create-product-page/create-product-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductsPageComponent },
  { path: 'create', component: CreateProductPageComponent },
  { path: '**', redirectTo: '/products' }, // fallback to /products
];
