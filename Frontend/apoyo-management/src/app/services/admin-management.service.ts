import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface CreateAdminRequest {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminManagementService {

  private apiUrl = 'http://localhost:5103/api/Admin';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('adminToken');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAdmins(): Observable<AdminUser[]> {
    return this.http.get<AdminUser[]>(
      this.apiUrl,
      {
        headers: this.getHeaders()
      }
    );
  }

  createAdmin(
    admin: CreateAdminRequest
  ): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/create`,
      admin,
      {
        headers: this.getHeaders()
      }
    );
  }
}