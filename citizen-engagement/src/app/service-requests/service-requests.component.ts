import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

interface ServiceRequest {
  id: number;
  title: string;
  description: string;
  dateSubmitted: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

@Component({
  selector: 'app-service-requests',
  standalone: true,
  templateUrl: './service-requests.component.html',
  styleUrls: ['./service-requests.component.scss'],
  imports: [ CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ]
})
export class ServiceRequestsComponent implements OnInit {
  requestForm!: FormGroup;
  requests: ServiceRequest[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });

    // Load from localStorage or backend
    const stored = localStorage.getItem('citizenRequests');
    this.requests = stored ? JSON.parse(stored) : [];
  }

  submitRequest(): void {
    if (this.requestForm.valid) {
      const newRequest: ServiceRequest = {
        id: this.requests.length + 1,
        title: this.requestForm.value.title,
        description: this.requestForm.value.description,
        dateSubmitted: new Date().toLocaleDateString(),
        status: 'Pending'
      };

      this.requests.unshift(newRequest);  // Add to top
      localStorage.setItem('citizenRequests', JSON.stringify(this.requests));
      this.requestForm.reset();
    }
  }
}
