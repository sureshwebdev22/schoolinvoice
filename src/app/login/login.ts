import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../services/auth';
import { email } from '@angular/forms/signals';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {

  // initialize loginForm to satisfy definite assignment; adjust controls as needed
  loginForm: FormGroup;

  private formBuilder = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required]]
    });

  }

  onSubmit(): void {
    this.auth.login(
      this.loginForm.value
    ).subscribe({
      next: (response: any) => {
        localStorage.setItem(
          'token',
          response.accessToken

        );
       this.router.navigate(['/home']); // Navigate to dashboard on successful login 
      },

      error: (err) => {
        console.error(err);
      }
    });
  }

}
