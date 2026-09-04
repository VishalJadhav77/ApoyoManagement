import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  message: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:5103/api/Admin';

  constructor(private http: HttpClient) {}

  login(
    credentials: AdminLoginRequest
  ): Observable<AdminLoginResponse> {

    return this.http.post<AdminLoginResponse>(
      `${this.apiUrl}/login`,
      credentials
    );
  }
}