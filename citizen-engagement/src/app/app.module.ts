import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProfileComponent } from './profile/profile.component';
import { ServiceRequestsComponent } from './service-requests/service-requests.component';
import { RequestStatusComponent } from './request-status/request-status.component';
import { FeedbackInsightsComponent } from './feedback-insights/feedback-insights.component';
import { ComplaintsManagementComponent } from './complaints-management/complaints-management.component';
import { AnalyticsOverviewComponent } from './analytics-overview/analytics-overview.component';


import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AppreciateComponent } from './appreciate/appreciate.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CitizenDashboardComponent } from './citizen-dashboard/citizen-dashboard.component'




@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    CreateAccountComponent,
 ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: WelcomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'create-account', component: CreateAccountComponent },
      { path: 'appreciate', component: AppreciateComponent },
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'citizen-dashboard', component: CitizenDashboardComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'service-request', component: ServiceRequestsComponent },
        { path: 'request-status', component: RequestStatusComponent },
        { path: 'complaints-management', component: FeedbackInsightsComponent },
  { path: 'analytics-overview', component: ComplaintsManagementComponent },
  { path: 'feedback-Insights', component: AnalyticsOverviewComponent },
      { path: '**', redirectTo: '' }
    ]),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 