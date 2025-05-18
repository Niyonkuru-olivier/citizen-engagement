import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Feedback {
  citizenName: string;
  rating: number;
  comment: string;
  date: Date;
}

@Component({
  selector: 'app-feedback-insights',
  standalone: true,
  templateUrl: './feedback-insights.component.html',
  styleUrls: ['./feedback-insights.component.scss'],
  imports: [CommonModule]
})
export class FeedbackInsightsComponent implements OnInit {
  feedbackList: Feedback[] = [];
  averageRating: number = 0;
  totalFeedback: number = 0;

  ngOnInit(): void {
    // Example static data — replace with API call later
    this.feedbackList = [
      {
        citizenName: 'Jane Doe',
        rating: 4,
        comment: 'Quick response to road issue. Thank you!',
        date: new Date('2024-05-01'),
      },
      {
        citizenName: 'John Smith',
        rating: 5,
        comment: 'Very satisfied with water service resolution.',
        date: new Date('2024-05-05'),
      },
      {
        citizenName: 'Ali Musa',
        rating: 3,
        comment: 'Service was delayed but resolved.',
        date: new Date('2024-05-10'),
      },
    ];

    this.totalFeedback = this.feedbackList.length;
    this.averageRating =
      this.feedbackList.reduce((sum, f) => sum + f.rating, 0) / this.totalFeedback;
  }
}
