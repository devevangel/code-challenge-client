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

export interface IPerson {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: any[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}
