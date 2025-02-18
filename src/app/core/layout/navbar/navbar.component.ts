import { AuthService } from './../../services/auth/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  _authService = inject(AuthService)

  isLoggedIn: any;

  constructor () {}

  ngOnInit(): void
  {
      this.checkLogginStatus()
  }

  checkLogginStatus()
  {
    this._authService.userDate.subscribe
      ({
        next:(res)=>
        {
          this.isLoggedIn = res
        }
      })
  }

  signOut()
  {
    this._authService.logOut()
  }

}
