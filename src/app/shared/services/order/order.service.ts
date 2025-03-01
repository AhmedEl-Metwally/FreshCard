import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { api_url } from '../../../core/custom_injections/api_url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly _httpClient = inject(HttpClient)
  token = localStorage.getItem("userToken") || '';
   //token = JSON.stringify(localStorage.getItem("userToken"))

  constructor(@Inject(api_url) private apiPath: string) { }

  cashOrder(id: string, shippingAddress: { details: string, phone: string, city:string }): Observable<any>
  {
    return this._httpClient.post(`${this.apiPath}/orders/${id}`, { shippingAddress }, {
      headers: { token: this.token }
    });
  }

  getAllOrders() : Observable<any>
  {
    return this._httpClient.get( `${this.apiPath}/orders`)
  }

  getUserOrders(id:string): Observable<any>
  {
    return this._httpClient.get(`${this.apiPath}/orders/user/${id}`)
  }

  onLinePayment(id: string, shippingAddress: { details: string, phone: string, city: string }): Observable<any> {
    return this._httpClient.post(`${this.apiPath}/orders/checkout-session/${id}?url=http://localhost:4200`, { shippingAddress }, {
      headers: { token: this.token }
    });
  }

 


  }












