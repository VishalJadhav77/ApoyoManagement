import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CandidateApplication {
  fullName: string;
  mobile: string;
  skills: string;
  currentCity: string;
  experienceLevel: string;
}

@Injectable({
  providedIn: 'root'
})
export class CandidateApplicationService {

  private apiUrl =
    'http://localhost:5103/api/CandidateApplications';

  constructor(private http: HttpClient) {}

  createApplication(
    application: CandidateApplication,
    resume: File
  ): Observable<any> {

    const formData = new FormData();

    formData.append('FullName', application.fullName);
    formData.append('Mobile', application.mobile);
    formData.append('Skills', application.skills);
    formData.append('CurrentCity', application.currentCity);
    formData.append('ExperienceLevel', application.experienceLevel);

    formData.append('resume', resume);

    return this.http.post(this.apiUrl, formData);
  }
}