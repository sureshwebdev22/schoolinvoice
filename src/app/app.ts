import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { NavBar } from "./nav-bar/nav-bar";
import { Alert } from './shared/alert/alert';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header,Footer,NavBar,Alert,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('schoolinvoice');

    isLoggedIn(): boolean {

    return !!localStorage.getItem('token');

  }
}
