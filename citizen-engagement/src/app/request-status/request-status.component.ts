import { Component, OnInit } from '@angular/core';

interface RequestStatus {
  id: number;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  submittedAt: string;
}

@Component({
  selector: 'app-request-status',
  templateUrl: './request-status.component.html',
  styleUrls: ['./request-status.component.scss']
})
export class RequestStatusComponent implements OnInit {

  requests: RequestStatus[] = [];

  constructor() {}

  ngOnInit(): void {
    // Example static data (replace with service call)
    this.requests = [
      {
        id: 1,
        title: 'Water Supply Issue',
        description: 'Low water pressure reported.',
        status: 'Pending',
        submittedAt: '2024-04-05'
      },
      {
        id: 2,
        title: 'Garbage Pickup Delay',
        description: 'Garbage not collected for 3 days.',
        status: 'In Progress',
        submittedAt: '2024-04-10'
      },
      {
        id: 3,
        title: 'Streetlight Repair',
        description: 'Streetlight near my home is not working.',
        status: 'Resolved',
        submittedAt: '2024-03-28'
      }
    ];
  }

  statusClass(status: string): string {
    switch (status) {
      case 'Pending': return 'pending';
      case 'In Progress': return 'in-progress';
      case 'Resolved': return 'resolved';
      default: return '';
    }
  }
}
