import { Component } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  CandidateApplicationService,
  CandidateApplication
} from '../../services/candidate-application';

@Component({
  selector: 'app-apply-jobs',
  imports: [ReactiveFormsModule],
  templateUrl: './apply-jobs.html',
  styleUrl: './apply-jobs.css'
})
export class ApplyJobs {

  applicationForm;

  message = '';
  isSubmitting = false;

  selectedFile: File | null = null;
  fileError = '';

  constructor(
    private fb: FormBuilder,
    private candidateApplicationService: CandidateApplicationService
  ) {
    this.applicationForm = this.fb.group({
      fullName: ['', Validators.required],

      mobile: ['', Validators.required],

      skills: ['', Validators.required],

      currentCity: ['', Validators.required],

      experienceLevel: ['', Validators.required],

      resumePath: ['']
    });
  }

  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    this.fileError = '';
    this.selectedFile = null;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    // Only PDF files
    if (file.type !== 'application/pdf') {
      this.fileError = 'Only PDF files are allowed.';
      input.value = '';
      return;
    }

    // Maximum 5 MB
    if (file.size > 5 * 1024 * 1024) {
      this.fileError = 'Resume size must be less than 5 MB.';
      input.value = '';
      return;
    }

    this.selectedFile = file;

    console.log('Selected resume:', file.name);
  }

  submitForm(): void {

  if (this.applicationForm.invalid) {
    this.applicationForm.markAllAsTouched();
    return;
  }

  if (!this.selectedFile) {
    this.fileError = 'Please select your resume.';
    return;
  }

  this.isSubmitting = true;
  this.message = '';
  this.fileError = '';

  const application =
    this.applicationForm.value as CandidateApplication;

  this.candidateApplicationService
    .createApplication(application, this.selectedFile)
    .subscribe({

      next: (response: any) => {

        console.log('API Response:', response);

        this.message =
          'Job application submitted successfully.';

        this.applicationForm.reset();

        this.selectedFile = null;

        this.isSubmitting = false;
      },

      error: (error: any) => {

        console.error('API Error:', error);

        this.message =
          error?.error?.message ||
          'Unable to submit application. Please try again.';

        this.isSubmitting = false;
      }

    });
}
}