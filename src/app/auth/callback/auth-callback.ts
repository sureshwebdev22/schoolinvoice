import { Component, inject } from '@angular/core';
import { AuthApiService } from '../../services/auth-api.service';
import { CurrentUser } from '../../models/CurrentUser';
import { CurrentUserService } from '../../services/current-user-service';

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

  private authApiService = inject(AuthApiService);

  private currentUserService = inject(CurrentUserService);


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

         // Call GET /api/auth/me
          this.currentUserService.loadCurrentUser()
            .subscribe({
              next: (user: CurrentUser) => {

                console.log(
                  'Current user:',
                  user
                );

                console.log(
                  'Email:',
                  user.email
                );

                console.log(
                  'Cognito Sub:',
                  user.cognitoSub
                );

                console.log(
                  'Roles:',
                  user.roles
                );

                this.router.navigate([
                  '/dashboard'
                ]);
              },

              error: error => {

                console.error(
                  'GET /api/auth/me failed:',
                  error
                );

                this.router.navigate([
                  '/unauthorized'
                ]);
              }
            });
        


      });
}
}