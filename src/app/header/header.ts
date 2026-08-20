import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Auth } from '../services/auth';
import { CurrentUserService } from '../services/current-user-service';
import { CurrentUser } from '../models/CurrentUser';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header  {
  

  private currentUserService = inject(CurrentUserService);
  private cdr = inject(ChangeDetectorRef);

  email: string | null = null;

  

  ngOnInit(): void {
    {


    this.currentUserService.user$
      .subscribe({
        next: (user: any) => {

          console.log(
            'Header received user:',
            user
          );

          


          if (user) {

        //    this.fullName = user.fullName;
            this.email = user.email;
            this.cdr.detectChanges();

            

          } else {

       //     this.fullName = null;
            this.email = null;
          }
        },

        error: (error) => {

          console.error(
            'Current user subscription error:',
            error
          );

        }
        
      });
  }
  }



  logout(): void {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
     // Clear session storage
  if (window.sessionStorage) {
    window.sessionStorage.clear();
  }

  window.location.href = "https://ap-south-1rb2vh3m1f.auth.ap-south-1.amazoncognito.com/logout?client_id=10vjnb8ggtj00gf5q5fvbghj45&logout_uri=http://localhost:4200/login";

/*
    

    this.authService.logout1();
   this.router.navigate(['/login']);

*/
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');

  }

}
