import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Alertservice } from '../../services/alertservice';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-user.html',
  styleUrls: ['./create-user.css'],
})
export class CreateUser {

  userForm: FormGroup;

  private userService = inject(UserService);
  private alertService = inject(Alertservice);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      
      email: [''],
      password: [''],
      fullName: [''],
      dateOfBirth: [''],
      gender: [''],
      mobileNo: [''],
      role: [''],
      address: [''],
      
    });
  }

  createUser(): void {

    this.userService.createUser(this.userForm.value)
      .subscribe({
        next: (data: any) => {
          console.log('User created successfully:', data);
          this.alertService.success( data.role + ' ' + data.fullName + ' created successfully!');
                    this.router.navigate(['/user/search']); // Navigate to the user search page after successful creation']);

          // You can navigate to another page or show a success message here
        },
        error: (err: any) => {
          console.error('Error creating user:', err);
          this.alertService.error(err.message || 'Error creating user.');
          // Handle the error, show an error message, etc.
        }
      });
    // Implement the logic to create a user using the userForm data
    console.log('Creating user with data:', this.userForm.value);
  }
}

