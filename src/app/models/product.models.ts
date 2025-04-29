// src/app/models/product.model.ts

export interface Product {
  id: string;
  name: string;
  description: string;
  unitCost: number;
  totalSales: number;
  inventory: number;
  imageUrl: string;
}

export interface ProductAPIResponse {
  status: string;
  dataCount?: number;
  data: Product[];
}
