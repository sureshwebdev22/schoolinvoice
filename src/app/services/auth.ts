import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  isAuthenticated(): boolean {
    // Implementation for checking authentication status
  //  return true;
   return localStorage.getItem('authToken') !== null;
  }

  login(username: string, password: string): boolean {
    // Implementation for login logic
    // This is a simplified example - replace with actual login logic
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('authToken', 'your-auth-token');
      return true;
    }
    return false;
  }

}