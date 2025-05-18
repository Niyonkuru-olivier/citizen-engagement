import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  role = '';
  errorMessage = '';

  constructor(private userService: UserService, private router: Router) {}

  onCreateAccount(): void {
    // Reset error message
    this.errorMessage = '';

    // Basic validation
    if (!this.name || !this.email || !this.password || !this.confirmPassword || !this.role) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    // Password match validation
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(this.password)) {
      this.errorMessage = 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.';
      return;
    }

    const payload = {
      full_name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
    };

    this.userService.register(payload).subscribe({
      next: (response) => {
        alert('Registration successful!');
        this.router.navigate(['/appreciate']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
      },
    });
  }
}
