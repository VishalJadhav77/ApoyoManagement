import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CorporateLead {
  companyName: string;
  contactPerson: string;
  businessEmail: string;
  mobile: string;
  workforceCategory: string;
  estimatedStaffSize: number;
  location: string;
  projectDetails: string;
}

@Injectable({
  providedIn: 'root'
})
export class CorporateLeadService {

  private apiUrl = 'http://localhost:5103/api/CorporateLeads';

  constructor(private http: HttpClient) {}

  createLead(lead: CorporateLead): Observable<any> {
    return this.http.post(this.apiUrl, lead);
  }
}