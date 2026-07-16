import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  
  private apiUrl = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    // Implementation for checking authentication status
  //  return true;
   return localStorage.getItem('token') !== null;
  }

  login(loginForm: any): Observable<any> {
      return this.http.post<any>(this.apiUrl, loginForm);
  }

  getRole(): string | null {

  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  const decoded: any = jwtDecode(token);
  console.log('Decoded token:', decoded); // Log the decoded token for debugging

  return decoded.role;
}




}