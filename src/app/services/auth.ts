import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  
  private apiUrl = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    // Implementation for checking authentication status
  //  return true;
   return localStorage.getItem('authToken') !== null;
  }

  login(loginForm: any): Observable<any> {
      return this.http.post<any>(this.apiUrl, loginForm);
  }

}