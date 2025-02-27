import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { api_url } from '../../../core/custom_injections/api_url';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private readonly _httpClient = inject(HttpClient)

  constructor(@Inject(api_url) private apiPath:string ) { }

  getproducts(categoryId?: string): Observable<any>
  {
    let url = categoryId ? `${this.apiPath}/products?category[in]=${categoryId}` : `${this.apiPath}/products`
    return this._httpClient.get(url)
  }

  getproductById(id: string): Observable<any>
  {
    return this._httpClient.get(`${this.apiPath}/products/${id}`)
  }

}
