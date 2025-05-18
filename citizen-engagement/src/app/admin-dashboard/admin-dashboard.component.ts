import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LogoutConfirmationDialogComponent } from '../logout-confirmation-dialog/logout-confirmation-dialog.component';

@Component({
  selector: 'app-citizen-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  imports: [CommonModule, 
    MatIconModule, RouterModule,
    CommonModule, 
    MatIconModule, 
    RouterModule,  
    MatButtonModule,MatCardModule,
    MatTableModule, MatTooltipModule,
    MatDialogModule]
})
export class AdminDashboardComponent implements OnInit {
  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.checkAuthentication();
  }

  private checkAuthentication(): void {
    const authToken = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    if (!authToken || userRole !== 'admin') {
      this.clearSessionData();
      this.router.navigate(['/login']);
    }
  }

  private clearSessionData(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    sessionStorage.clear();
  }

  logout(): void {
      const dialogRef = this.dialog.open(LogoutConfirmationDialogComponent, {
        width: '300px',
        disableClose: true
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.clearSessionData();
          this.router.navigate(['/login']);
        }
      });
    }
}
