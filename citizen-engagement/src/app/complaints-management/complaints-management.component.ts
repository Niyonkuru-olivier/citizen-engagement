import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-complaints-management',
  standalone: true,
  templateUrl: './complaints-management.component.html',
  styleUrls: ['./complaints-management.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class ComplaintsManagementComponent {
  complaints = [
    {
      id: 1,
      citizen: 'Alice M.',
      category: 'Water Supply',
      description: 'No water since 2 days.',
      status: 'Open',
      date: '2025-05-16',
    },
    {
      id: 2,
      citizen: 'Bob J.',
      category: 'Road Repair',
      description: 'Huge potholes on Main St.',
      status: 'In Progress',
      date: '2025-05-15',
    },
    {
      id: 3,
      citizen: 'Sara T.',
      category: 'Electricity',
      description: 'Frequent power cuts.',
      status: 'Resolved',
      date: '2025-05-14',
    }
  ];

  filteredComplaints = [...this.complaints];

  statusOptions = ['Open', 'In Progress', 'Resolved'];
  categoryOptions = ['Water Supply', 'Road Repair', 'Electricity'];

  selectedStatus = '';
  selectedCategory = '';

  applyFilters(): void {
    this.filteredComplaints = this.complaints.filter(c => {
      const statusMatch = this.selectedStatus ? c.status === this.selectedStatus : true;
      const categoryMatch = this.selectedCategory ? c.category === this.selectedCategory : true;
      return statusMatch && categoryMatch;
    });
  }

  markResolved(complaint: any): void {
    complaint.status = 'Resolved';
    this.applyFilters();
  }
}
