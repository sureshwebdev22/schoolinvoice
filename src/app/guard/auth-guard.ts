import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

import {
  OidcSecurityService
} from 'angular-auth-oidc-client';

import {
  map
} from 'rxjs/operators';


export const authGuard: CanActivateFn = () => {

  return localStorage.getItem('token') ? true : inject(Router).createUrlTree(['/login']);
/*
  const oidc =
    inject(OidcSecurityService);

  const router =
    inject(Router);


  return oidc
    .isAuthenticated()
    .pipe(

      map(result => {

        if (result) {

          return true;

        }

        return router.createUrlTree([
          '/login'
        ]);

      })

    );*/

};