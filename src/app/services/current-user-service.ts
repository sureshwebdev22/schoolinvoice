import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { CurrentUser } from '../models/CurrentUser';
import { AuthApiService } from './auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  private readonly userSubject =
    new BehaviorSubject<CurrentUser | null>(null);

  public user$: Observable<CurrentUser | null> =
    this.userSubject.asObservable();

  constructor(
    private authApiService: AuthApiService
  ) {}

  loadCurrentUser(): Observable<CurrentUser> {

    const request =
      this.authApiService.getCurrentUser();

    request.subscribe({
      next: user => {
        console.log('Current user:', user);

        this.userSubject.next(user);
      },

      error: error => {
        console.error(
          'Failed to load current user',
          error
        );

        this.userSubject.next(null);
      }
    });

    return request;
  }

  clearUser(): void {
    this.userSubject.next(null);
  }

  get user(): CurrentUser | null {
    return this.userSubject.value;
  }

  get roles(): string[] {
    return this.userSubject.value?.roles ?? [];
  }

  getRole(): string | null {

    const roles = this.roles;

    if (!roles.length) {
      return null;
    }

    return roles[0];
  }

  hasRole(role: string): boolean {

    return this.roles.includes(role);
  }

  hasAnyRole(roles: string[]): boolean {

    return roles.some(role =>
      this.hasRole(role)
    );
  }
}