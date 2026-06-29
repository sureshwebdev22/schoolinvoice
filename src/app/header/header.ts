import { Component , inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
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

}
