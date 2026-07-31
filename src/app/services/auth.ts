import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  
  //private apiUrl = 'http://localhost:8080/api/auth/login';

    private apiUrl = environment.apiUrl +'/auth';


  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    // Implementation for checking authentication status
  //  return true;
   return localStorage.getItem('token') !== null;
  }

  login(loginForm: any): Observable<any> {
      return this.http.post<any>(this.apiUrl+'/login', loginForm);
  }

  getRole(): string | null {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return null;
    }
     const response = JSON.parse(token);
    // token is a string (JWT) stored in localStorage
    console.log('Role from localStorage:', response.role); // Log the token for debugging


    return response.role;
  }

    register(user:any):Observable<any>{

    return this.http.post(
      this.apiUrl+"/register",
      user
    );

  }



}