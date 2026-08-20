import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { CurrentUser } from '../models/current-user';

import { CurrentUser } from '../models/CurrentUser';


@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private readonly apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<CurrentUser> {
    return this.http.get<CurrentUser>(
      `${this.apiUrl}/auth/me`
    );
  }

 /* getMe(): Observable<CurrentUser> {
    return this.http.get<CurrentUser>(
      `${this.apiUrl}/auth/me`
    );
  }*/
}