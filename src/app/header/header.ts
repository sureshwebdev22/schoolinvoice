import { CommonModule } from '@angular/common';
import { Component , inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {


  private router = inject(Router);
logout():void {

  localStorage.removeItem("token");
  //this.router.navigate(['/login']);
      this.router.navigateByUrl('/login');


}


    isLoggedIn(): boolean {
    return !!localStorage.getItem('token');

  }

}
