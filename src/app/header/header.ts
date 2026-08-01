import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {


  private router = inject(Router);

  username: string = '';

  ngOnInit(): void {

    this.loadUser();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadUser();
      });
  }

  loadUser(): void {
    const data = JSON.parse(localStorage.getItem('token') || '{}');
    this.username = data.fullName || '';
  }

  logout(): void {

    localStorage.removeItem("token");
    //this.router.navigate(['/login']);
    this.username = '';
    this.router.navigateByUrl('/login');


  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');

  }

}
