import { api_url } from './../../../core/custom_injections/api_url';
import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

   _httpClient = inject(HttpClient)

  constructor(@Inject(api_url) private apiPath:string) { }
  
  getAllCategoreis(): Observable<any>
  {
    return this._httpClient.get( this.apiPath + `/categories`)
  }
}
