import { HttpClient } from '@angular/common/http';
import { afterNextRender, Inject, inject, Injectable } from '@angular/core';
import { AuthUser, LoginUser } from '../../interfaces/auth-user';
import { BehaviorSubject, Observable } from 'rxjs';
import { api_url } from '../../custom_injections/api_url';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userDate: BehaviorSubject<any> = new BehaviorSubject('') 

  _httpClient = inject(HttpClient)
    _router = inject(Router)

  constructor(@Inject(api_url) private apiPath: string)
   {
   
        afterNextRender(() => {
          this.isLoggedInUser()
        })
   }

  registerUser(userInfo: AuthUser) : Observable<any>
  {
    return this._httpClient.post(this.apiPath + `/auth/signup`, userInfo)
  }

  loginUser(userInfo: LoginUser) : Observable<any>
  {
    return this._httpClient.post( this.apiPath + `/auth/signin`, userInfo)
  }

  saveUser()
  {
    if (localStorage.getItem("userToken"))
    {
      this.userDate.next(jwtDecode(localStorage.getItem("userToken")!))
    }
  }

  logOut()
  {
    localStorage.removeItem("userToken")
    this.userDate.next(null)
    this._router.navigate(['/auth/login'])
  }

  isLoggedInUser(): boolean
  {
    if (localStorage.getItem("userToken"))
    {
      this.userDate.next(jwtDecode(localStorage.getItem("userToken")!))
      return true
    }
    else
    {
      return false
    }
  }


}



