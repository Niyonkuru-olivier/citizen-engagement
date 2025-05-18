import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-citizen-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule 
  ]
})
export class ProfileComponent implements OnInit {
  citizen = {
    fullName: '',
    email: '',
    phone: '',
    address: ''
  };

  ngOnInit(): void {
    this.loadCitizenProfile();
  }

  loadCitizenProfile(): void {
    // Replace this with actual API call
    const storedUser = {
      fullName: 'John Citizen',
      email: 'john@example.com',
      phone: '0987654321',
      address: '123 Main St, Springfield'
    };
    this.citizen = storedUser;
  }

  onSubmit(): void {
    // Replace with backend call to update the profile
    console.log('Updated profile:', this.citizen);
    alert('Profile updated successfully!');
  }
}
