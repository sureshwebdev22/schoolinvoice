import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { NavBar } from "./nav-bar/nav-bar";
import { Alert } from './shared/alert/alert';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header,Footer,NavBar,Alert],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('schoolinvoice');
}
