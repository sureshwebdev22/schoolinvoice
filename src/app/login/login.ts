import { Component, inject } from '@angular/core';

import {
  OidcSecurityService
} from 'angular-auth-oidc-client';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private oidc =
    inject(OidcSecurityService);

  login(): void {

    this.oidc.authorize();
   

  }

}