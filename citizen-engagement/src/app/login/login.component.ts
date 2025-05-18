import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  selectedRole = '';
  errorMessage = '';
  successMessage = '';
  showForgotPassword = false;
  forgotEmail = '';

  constructor(private userService: UserService, private router: Router, private http: HttpClient) {}

  onLogin(): void {
    const payload = {
      email: this.email,
      password: this.password,
      role: this.selectedRole,
    };

    this.userService.login(payload).subscribe({
      next: (res: any) => {
        this.errorMessage = '';
        this.successMessage = 'Login successful!';
        localStorage.setItem('authToken', res.access_token || res.token);
        localStorage.setItem('userRole', res.user.role);
        // Navigate based on role
        if (res.user.role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else if (res.user.role === 'citizen') {
          this.router.navigate(['/citizen-dashboard']);
        }
      },
      error: (err) => {
        this.successMessage = '';
        this.errorMessage = err.error?.message || 'Login failed: Unknown error';
      },
    });
  }

  openForgotPassword(): void {
    this.showForgotPassword = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  cancelForgotPassword(): void {
    this.showForgotPassword = false;
    this.forgotEmail = '';
    this.errorMessage = '';
    this.successMessage = '';
  }

  submitForgotPassword(): void {
    if (!this.forgotEmail.trim()) {
      this.errorMessage = 'Please enter your registered email.';
      return;
    }

    this.http.post<{ message: string, token?: string }>(`${environment.apiUrl}/auth/forgot-password`, {
      email: this.forgotEmail
    }).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        this.errorMessage = '';
        this.showForgotPassword = false;
        this.forgotEmail = '';
        console.log('Reset Token (for dev):', res.token);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to send reset link.';
        this.successMessage = '';
      }
    });
  }
}
