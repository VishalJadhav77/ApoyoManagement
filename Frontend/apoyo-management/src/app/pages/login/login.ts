import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';

  errorMessage = '';
  isSubmitting = false;

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  login(): void {

    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter email and password.';
      return;
    }

    this.isSubmitting = true;

    this.adminService.login({
      email: this.email,
      password: this.password
    }).subscribe({

      next: (response) => {

        console.log('Login successful:', response);

        // Store JWT token
        localStorage.setItem('adminToken', response.token);

        // Store admin information
        localStorage.setItem(
          'adminUsername',
          response.name
        );

        localStorage.setItem(
          'adminEmail',
          response.email
        );

        localStorage.setItem(
          'adminRole',
          response.role
        );

        this.isSubmitting = false;

        // Redirect to dashboard
        this.router.navigate(['/dashboard']);
      },

      error: (error) => {

        console.error('Login error:', error);

        this.errorMessage =
          error?.error?.message ||
          'Invalid email or password.';

        this.isSubmitting = false;
      }

    });
  }
}