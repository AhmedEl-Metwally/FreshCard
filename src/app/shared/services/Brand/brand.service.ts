import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { api_url } from '../../../core/custom_injections/api_url';
import { Observable } from 'rxjs';
import { Brand } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

   private readonly _httpClient = inject(HttpClient)

  constructor(@Inject(api_url) private apiPath: string) { }
  
  getAllBrands(): Observable<{ data: Brand[] }>
  {
    return this._httpClient.get<{ data: Brand[] }>(`${this.apiPath}/brands`);
  }


  getSpecificBrand(id: string): Observable<Brand>
  {
    return this._httpClient.get<Brand>(`${this.apiPath}/brands/${id}`);
  }


}
