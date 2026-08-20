import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor }
from './interceptors/auth-interceptor';

import { routes } from './app.routes';
import {
  provideAuth,
  LogLevel
} from 'angular-auth-oidc-client';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
      provideHttpClient(

      withInterceptors([authInterceptor])

    ),
     provideAuth({
      config: {

        authority:
          'https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_rB2Vh3M1f',

        redirectUrl:
          'http://localhost:4200/auth/callback',

        postLogoutRedirectUri:
          'http://localhost:4200',

        clientId:
          '10vjnb8ggtj00gf5q5fvbghj45',

        scope:
          'openid email phone',

        responseType:
          'code'


      }
    })
  ]
};
