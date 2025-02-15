import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthUser, LoginUser } from '../../interfaces/auth-user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _httpClient = inject(HttpClient)

  constructor() { }

  registerUser(userInfo: AuthUser) : Observable<any>
  {
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, userInfo)
  }

  loginUser(userInfo: LoginUser) : Observable<any>
  {
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, userInfo)
  }


}
