import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { api_url } from '../../../core/custom_injections/api_url';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private readonly _httpClient = inject(HttpClient)

  constructor(@Inject(api_url) private apiPath:string ) { }

  getproducts() : Observable<any> {
   return this._httpClient.get( this.apiPath + `/products`)
  }
}
