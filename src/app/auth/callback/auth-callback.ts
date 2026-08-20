import { Component, inject } from '@angular/core';

import {
  OidcSecurityService
} from 'angular-auth-oidc-client';

import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-callback',
  standalone: true,

  template: `
    <div class="container mt-5 text-center">

      <h4>
        Signing you in...
      </h4>

    </div>
  `
})
export class AuthCallback {

  private oidc =
    inject(OidcSecurityService);

  private router =
    inject(Router);

  constructor() {

    this.oidc.checkAuth()
      .subscribe(result => {

        console.log(
          'Authenticated:',
          result.isAuthenticated
        );

        console.log(
          'Access Token:',
          result.accessToken
        );
        localStorage.setItem('token', JSON.stringify(result)); 

       
        if (result.isAuthenticated) {

          this.router.navigate(['/home']);

        } else {

          this.router.navigate(['/login']);

        }

      });

  }
}