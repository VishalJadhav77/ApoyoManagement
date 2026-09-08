import { Component, ChangeDetectorRef } from '@angular/core';
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
    private candidateApplicationService: CandidateApplicationService,
    private cdr: ChangeDetectorRef
  ) {

    this.applicationForm = this.fb.group({

      fullName: [
        '',
        Validators.required
      ],

      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{10}$/)
        ]
      ],

      skills: [
        '',
        Validators.required
      ],

      currentCity: [
        '',
        Validators.required
      ],

      experienceLevel: [
        '',
        Validators.required
      ],

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

      this.fileError =
        'Only PDF files are allowed.';

      input.value = '';

      return;
    }

    // Maximum 5 MB
    if (file.size > 5 * 1024 * 1024) {

      this.fileError =
        'Resume size must be less than 5 MB.';

      input.value = '';

      return;
    }

    this.selectedFile = file;

    console.log(
      'Selected resume:',
      file.name
    );
  }

  submitForm(): void {

    // Validate form
    if (this.applicationForm.invalid) {

      this.applicationForm.markAllAsTouched();

      return;
    }

    // Validate resume
    if (!this.selectedFile) {

      this.fileError =
        'Please select your resume.';

      return;
    }

    this.isSubmitting = true;
    this.message = '';
    this.fileError = '';

    // Get form data
    const application =
      this.applicationForm.value as CandidateApplication;

    // Call ASP.NET Core API
    this.candidateApplicationService
      .createApplication(
        application,
        this.selectedFile
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'API Response:',
            response
          );

          // Show success notification
          this.message =
            'Application submitted successfully! Our recruitment team will review your profile and contact you if a suitable opportunity is available.';

          // Reset form
          this.applicationForm.reset();

          // Clear selected file
          this.selectedFile = null;

          this.isSubmitting = false;

          // Automatically hide notification after 4 seconds
          setTimeout(() => {

            this.message = '';

            // Force Angular to update the UI
            this.cdr.detectChanges();

          }, 4000);
        },

        error: (error: any) => {

          console.error(
            'API Error:',
            error
          );

          this.message =
            error?.error?.message ||
            'Unable to submit the application. Please try again.';

          this.isSubmitting = false;

          this.cdr.detectChanges();
        }

      });
  }
}