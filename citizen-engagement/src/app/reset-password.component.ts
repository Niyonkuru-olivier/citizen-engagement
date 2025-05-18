import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  imports: [ BrowserModule, FormsModule]
})
export class ResetPasswordComponent {
  email = '';
  token = '';
  newPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onResetPassword() {
    this.errorMessage = '';
    this.successMessage = '';
    if (!this.email || !this.token || !this.newPassword) {
      this.errorMessage = 'All fields are required.';
      return;
    }
    this.authService.resetPassword(this.token, this.newPassword).subscribe({
      next: () => {
        this.successMessage = 'Password reset successful!';
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to reset password.';
        this.successMessage = '';
      }
    });
  }
}
