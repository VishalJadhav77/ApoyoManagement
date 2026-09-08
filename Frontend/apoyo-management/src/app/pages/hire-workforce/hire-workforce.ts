import { Component, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  CorporateLeadService,
  CorporateLead
} from '../../services/corporate-lead';

@Component({
  selector: 'app-hire-workforce',
  imports: [ReactiveFormsModule],
  templateUrl: './hire-workforce.html',
  styleUrl: './hire-workforce.css'
})
export class HireWorkforce {

  hireForm;

  message = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private corporateLeadService: CorporateLeadService,
    private cdr: ChangeDetectorRef
  ) {

    this.hireForm = this.fb.group({

      companyName: [
        '',
        Validators.required
      ],

      contactPerson: [
        '',
        Validators.required
      ],

      businessEmail: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[6-9]\d{9}$/)
        ]
      ],

      workforceCategory: [
        '',
        Validators.required
      ],

      estimatedStaffSize: [
        0,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      location: [
        '',
        Validators.required
      ],

      projectDetails: [
        '',
        Validators.required
      ]
    });
  }

  submitForm(): void {

    // Validate form
    if (this.hireForm.invalid) {
      this.hireForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.message = '';

    // Get form data
    const lead = this.hireForm.value as CorporateLead;

    // Call ASP.NET Core API
    this.corporateLeadService.createLead(lead).subscribe({

      next: (response: any) => {

        console.log('API Response:', response);

        // Show success notification
        this.message =
          'Requirement submitted successfully! Our team will get in touch with you shortly.';

        // Reset form
        this.hireForm.reset({
          estimatedStaffSize: 0
        });

        this.isSubmitting = false;

        // Automatically hide notification after 4 seconds
        setTimeout(() => {

          this.message = '';

          // Force Angular to update the UI
          this.cdr.detectChanges();

        }, 4000);
      },

      error: (error: any) => {

        console.error('API Error:', error);

        this.message =
          'Unable to submit the requirement. Please try again.';

        this.isSubmitting = false;

        this.cdr.detectChanges();
      }

    });
  }
}