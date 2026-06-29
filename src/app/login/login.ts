import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../services/auth';

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
      username: ['',[Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required]]
    });

  }


  onSubmit() {
    console.log('Form submitted:', this.loginForm.value);
    console.log('Form valid:', this.loginForm.errors);
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const success = this.auth.login(username, password);
      if (success) {
        this.router.navigate(['/home']); // Navigate to dashboard on successful login 
        // Handle successful login, e.g., navigate to dashboard
        console.log('Login successful');
      } else {
        // Handle failed login, e.g., show error message
        console.log('Login failed');
      }
    }

    else {
      console.log('Form is invalid');
    }
  }

}
