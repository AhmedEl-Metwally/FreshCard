import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private readonly _httpClient = inject(HttpClient)

  constructor() { }

  getproducts() : Observable<any> {
   return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
}
