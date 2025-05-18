import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'Submitted' | 'In Review' | 'Resolved' | 'Closed';
  citizenId: string;
  agencyId: string;
  createdAt: Date;
  updatedAt: Date;
  responses: ComplaintResponse[];
}

export interface ComplaintResponse {
  id: string;
  complaintId: string;
  agencyId: string;
  message: string;
  createdAt: Date;
}

export interface ComplaintStats {
  totalComplaints: number;
  resolvedComplaints: number;
  averageResolutionTime: number;
  topCategories: { category: string; count: number }[];
}

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  constructor(private http: HttpClient) {}

  // Citizen endpoints
  createComplaint(complaint: Omit<Complaint, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'responses'>): Observable<Complaint> {
    return this.http.post<Complaint>(`${environment.apiUrl}/complaints`, complaint);
  }

  getCitizenComplaints(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${environment.apiUrl}/complaints/citizen`);
  }

  // Agency endpoints
  getAgencyComplaints(filters?: {
    status?: string;
    category?: string;
    startDate?: Date;
    endDate?: Date;
  }): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${environment.apiUrl}/complaints/agency`, { params: filters as any });
  }

  updateComplaintStatus(complaintId: string, status: Complaint['status']): Observable<Complaint> {
    return this.http.patch<Complaint>(`${environment.apiUrl}/complaints/${complaintId}/status`, { status });
  }

  addComplaintResponse(complaintId: string, response: { message: string }): Observable<ComplaintResponse> {
    return this.http.post<ComplaintResponse>(`${environment.apiUrl}/complaints/${complaintId}/responses`, response);
  }

  getComplaintStats(): Observable<ComplaintStats> {
    return this.http.get<ComplaintStats>(`${environment.apiUrl}/complaints/stats`);
  }
} 