import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UpdateLeadRequest {
  status?: string | null;
  assignedTo?: string | null;
  followUpDate?: string | null;
  internalNotes?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private candidateApi =
    'http://localhost:5103/api/CandidateApplications';

  private corporateApi =
    'http://localhost:5103/api/CorporateLeads';

  constructor(private http: HttpClient) {}

  // ==========================================
  // Get Candidates
  // ==========================================

  getCandidates(): Observable<any[]> {
    return this.http.get<any[]>(this.candidateApi);
  }


  // ==========================================
  // Get Corporate Leads
  // ==========================================

  getCorporateLeads(): Observable<any[]> {
    return this.http.get<any[]>(this.corporateApi);
  }


  // ==========================================
  // Update Candidate Application
  // ==========================================

  updateCandidate(
    id: number,
    data: UpdateLeadRequest
  ): Observable<any> {

    return this.http.put<any>(
      `${this.candidateApi}/${id}`,
      data
    );

  }


  // ==========================================
  // Update Corporate Lead
  // ==========================================

  updateCorporateLead(
    id: number,
    data: UpdateLeadRequest
  ): Observable<any> {

    return this.http.put<any>(
      `${this.corporateApi}/${id}`,
      data
    );

  }

    // ==========================================
  // Delete Candidate Application
  // ==========================================

  deleteCandidate(id: number): Observable<any> {

    return this.http.delete<any>(
      `${this.candidateApi}/${id}`
    );

  }


  // ==========================================
  // Delete Corporate Lead
  // ==========================================

  deleteCorporateLead(id: number): Observable<any> {

    return this.http.delete<any>(
      `${this.corporateApi}/${id}`
    );

  }

}