import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analytics-overview',
  templateUrl: './analytics-overview.component.html',
  styleUrls: ['./analytics-overview.component.scss']
})
export class AnalyticsOverviewComponent implements OnInit {
  totalComplaintsToday = 12;
  totalComplaintsThisMonth = 120;
  complaintStatusData = {
    open: 45,
    inProgress: 30,
    resolved: 45,
  };
  complaintsByCategory = {
    water: 30,
    electricity: 25,
    roads: 35,
    sanitation: 30,
  };
  averageResolutionTime = '2.4 days';

  constructor() {}

  ngOnInit(): void {}
}
