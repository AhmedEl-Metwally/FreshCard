import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { AuthUser, LoginUser } from '../../interfaces/auth-user';
import { Observable } from 'rxjs';
import { api_url } from '../../custom_injections/api_url';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _httpClient = inject(HttpClient)

  constructor( @Inject(api_url) private apiPath:string  ) { }

  registerUser(userInfo: AuthUser) : Observable<any>
  {
    return this._httpClient.post(this.apiPath + `/auth/signup`, userInfo)
  }

  loginUser(userInfo: LoginUser) : Observable<any>
  {
    return this._httpClient.post( this.apiPath + `/auth/signin`, userInfo)
  }


}



