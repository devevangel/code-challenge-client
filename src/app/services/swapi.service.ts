import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPerson } from '../models/product.models';

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  url = 'https://swapi.info/api/people';

  constructor(private http: HttpClient) {}

  getPersons() {
    return this.http.get<IPerson[]>(this.url);
  }
}
