import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_url } from '../../../core/custom_injections/api_url';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  _httpClient = inject(HttpClient)
  token:string = JSON.stringify( localStorage.getItem("userToken"))    


  constructor(@Inject(api_url) private apiPath:string) { }


  addProductToCard(productId:string): Observable<any>
  {
    return this._httpClient.post(this.apiPath + `/cart`, { productId }, {
      headers: {
        token: JSON.parse( this.token)
      }
    })
  }

  updateProductQuantity(productId: string, count: string): Observable<any> {
    return this._httpClient.put(this.apiPath + `/cart/${productId}`, { count }, {
      headers: {
        token: JSON.parse(this.token)
      }
    });
  }


  getCard(): Observable<any> {
    return this._httpClient.get(this.apiPath + `/cart`, {
      headers: {
        token: JSON.parse(this.token)
      }
    })
  }

  removeSpecificIItem(productId: string): Observable<any>
  {
    return this._httpClient.delete(this.apiPath + `/cart/${productId}`, {
      headers: {
        token: JSON.parse(this.token)
      }
    });
  }


  clearCart(): Observable<any> {
    return this._httpClient.delete(this.apiPath + `/cart `, {
      headers: {
        token: JSON.parse(this.token)
      }
    })
  }







}
