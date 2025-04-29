import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductAPIResponse } from '../models/product.models';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<ProductAPIResponse>(this.apiUrl)
      .pipe(map((response) => response.data));
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchProductsByName(name: string): Observable<Product[]> {
    return this.http
      .get<ProductAPIResponse>(`${this.apiUrl}?name=${name}`)
      .pipe(map((response) => response.data));
  }

  filterProducts(params: {
    cost?: number;
    costOp?: string;
    sales?: number;
    salesOp?: string;
  }): Observable<Product[]> {
    let query = '';

    if (params.cost !== undefined && params.costOp) {
      query += `cost=${params.cost}&costOp=${params.costOp}`;
    }
    if (params.sales !== undefined && params.salesOp) {
      if (query) {
        query += '&'; // add & if already something in query
      }
      query += `sales=${params.sales}&salesOp=${params.salesOp}`;
    }

    const fullUrl = query ? `${this.apiUrl}?${query}` : this.apiUrl;

    return this.http
      .get<ProductAPIResponse>(fullUrl)
      .pipe(map((response) => response.data));
  }
}
