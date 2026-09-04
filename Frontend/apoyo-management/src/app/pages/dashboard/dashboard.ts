import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { DashboardService } from '../../services/dashboard';

import {
  AdminManagementService,
  AdminUser
} from '../../services/admin-management.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DatePipe, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  // ==========================================
  // Candidates
  // ==========================================

  candidates = signal<any[]>([]);

  totalCandidates = signal(0);


  // ==========================================
  // Candidate Search & Filter
  // ==========================================

  candidateSearch = '';

  candidateStatusFilter = 'All';

  candidateStatuses = [
    'New',
    'In Review',
    'Contacted',
    'Shortlisted',
    'Selected',
    'Rejected',
    'Closed/Archived'
  ];


  // ==========================================
  // Candidate Status Counts
  // ==========================================

  newCandidates = signal(0);

  inReviewCandidates = signal(0);

  contactedCandidates = signal(0);

  shortlistedCandidates = signal(0);

  selectedCandidates = signal(0);

  rejectedCandidates = signal(0);

  closedCandidates = signal(0);


  // ==========================================
  // Corporate Leads
  // ==========================================

  corporateLeads = signal<any[]>([]);

  totalCorporateLeads = signal(0);


  // ==========================================
  // Corporate Lead Search & Filter
  // ==========================================

  corporateSearch = '';

  corporateStatusFilter = 'All';

  corporateLeadStatuses = [
    'New',
    'In Review',
    'Contacted',
    'Proposal Sent',
    'Contract Signed',
    'Closed/Archived'
  ];


  // ==========================================
  // Corporate Lead Status Counts
  // ==========================================

  newCorporateLeads = signal(0);

  inReviewCorporateLeads = signal(0);

  contactedCorporateLeads = signal(0);

  proposalSentLeads = signal(0);

  contractSignedLeads = signal(0);

  closedCorporateLeads = signal(0);


  // ==========================================
  // Admin Users
  // ==========================================

  admins = signal<AdminUser[]>([]);


  // ==========================================
  // New Admin Form
  // ==========================================

  newAdminName = '';

  newAdminEmail = '';

  newAdminPassword = '';


  // ==========================================
  // Admin Form State
  // ==========================================

  adminMessage = '';

  adminError = '';

  isCreatingAdmin = false;


  // ==========================================
  // Lead Management State
  // ==========================================

  updatingCandidateId: number | null = null;

  updatingCorporateLeadId: number | null = null;


  // ==========================================
  // Constructor
  // ==========================================

  constructor(
    private dashboardService: DashboardService,
    private adminManagementService: AdminManagementService,
    private router: Router
  ) {}


  // ==========================================
  // Initialize Dashboard
  // ==========================================

  ngOnInit(): void {

    console.log('Dashboard initialized');

    this.loadDashboard();

    this.loadAdmins();

  }


  // ==========================================
  // Load Dashboard Data
  // ==========================================

  loadDashboard(): void {

    // ------------------------------------------
    // Candidates
    // ------------------------------------------

    this.dashboardService.getCandidates().subscribe({

      next: (data: any[]) => {

        console.log(
          'CANDIDATES RECEIVED:',
          data
        );

        this.candidates.set(data);

        this.totalCandidates.set(data.length);

        this.calculateCandidateStatusCounts();

      },

      error: (error: any) => {

        console.error(
          'Candidate API Error:',
          error
        );

        if (
          error.status === 401 ||
          error.status === 403
        ) {

          this.logout();

        }

      }

    });


    // ------------------------------------------
    // Corporate Leads
    // ------------------------------------------

    this.dashboardService.getCorporateLeads().subscribe({

      next: (data: any[]) => {

        console.log(
          'CORPORATE LEADS RECEIVED:',
          data
        );

        this.corporateLeads.set(data);

        this.totalCorporateLeads.set(data.length);

        this.calculateCorporateLeadStatusCounts();

      },

      error: (error: any) => {

        console.error(
          'Corporate Lead API Error:',
          error
        );

        if (
          error.status === 401 ||
          error.status === 403
        ) {

          this.logout();

        }

      }

    });

  }


  // ==========================================
  // Calculate Candidate Status Counts
  // ==========================================

  calculateCandidateStatusCounts(): void {

    const data = this.candidates();

    this.newCandidates.set(
      data.filter(x => x.status === 'New').length
    );

    this.inReviewCandidates.set(
      data.filter(x => x.status === 'In Review').length
    );

    this.contactedCandidates.set(
      data.filter(x => x.status === 'Contacted').length
    );

    this.shortlistedCandidates.set(
      data.filter(x => x.status === 'Shortlisted').length
    );

    this.selectedCandidates.set(
      data.filter(x => x.status === 'Selected').length
    );

    this.rejectedCandidates.set(
      data.filter(x => x.status === 'Rejected').length
    );

    this.closedCandidates.set(
      data.filter(x => x.status === 'Closed/Archived').length
    );

  }


  // ==========================================
  // Calculate Corporate Lead Status Counts
  // ==========================================

  calculateCorporateLeadStatusCounts(): void {

    const data = this.corporateLeads();

    this.newCorporateLeads.set(
      data.filter(x => x.status === 'New').length
    );

    this.inReviewCorporateLeads.set(
      data.filter(x => x.status === 'In Review').length
    );

    this.contactedCorporateLeads.set(
      data.filter(x => x.status === 'Contacted').length
    );

    this.proposalSentLeads.set(
      data.filter(x => x.status === 'Proposal Sent').length
    );

    this.contractSignedLeads.set(
      data.filter(x => x.status === 'Contract Signed').length
    );

    this.closedCorporateLeads.set(
      data.filter(x => x.status === 'Closed/Archived').length
    );

  }


  // ==========================================
  // Load Admin Users
  // ==========================================

  loadAdmins(): void {

    this.adminManagementService.getAdmins().subscribe({

      next: (data: AdminUser[]) => {

        console.log(
          'ADMINS RECEIVED:',
          data
        );

        this.admins.set(data);

      },

      error: (error: any) => {

        console.error(
          'Admin API Error:',
          error
        );

        if (
          error.status === 401 ||
          error.status === 403
        ) {

          this.logout();

        }

      }

    });

  }


  // ==========================================
  // Create Admin
  // ==========================================

  createAdmin(): void {

    this.adminMessage = '';

    this.adminError = '';


    // ------------------------------------------
    // Validation
    // ------------------------------------------

    if (
      !this.newAdminName.trim() ||
      !this.newAdminEmail.trim() ||
      !this.newAdminPassword.trim()
    ) {

      this.adminError =
        'Please fill in all fields.';

      return;

    }


    // ------------------------------------------
    // Password Validation
    // ------------------------------------------

    if (this.newAdminPassword.length < 6) {

      this.adminError =
        'Password must be at least 6 characters.';

      return;

    }


    // ------------------------------------------
    // Start Loading
    // ------------------------------------------

    this.isCreatingAdmin = true;


    // ------------------------------------------
    // Create Admin API
    // ------------------------------------------

    this.adminManagementService.createAdmin({

      name: this.newAdminName.trim(),

      email: this.newAdminEmail.trim(),

      password: this.newAdminPassword

    }).subscribe({

      next: () => {

        console.log(
          'Admin created successfully'
        );

        this.adminMessage =
          'Admin user created successfully.';

        this.newAdminName = '';

        this.newAdminEmail = '';

        this.newAdminPassword = '';

        this.isCreatingAdmin = false;

        this.loadAdmins();

      },

      error: (error: any) => {

        console.error(
          'Create admin error:',
          error
        );

        this.adminError =
          error?.error?.message ||
          'Unable to create admin user.';

        this.isCreatingAdmin = false;

      }

    });

  }


  // ==========================================
  // Update Candidate Application
  // ==========================================

  updateCandidate(candidate: any): void {

    if (!candidate?.id) {

      return;

    }

    this.updatingCandidateId = candidate.id;


    const updateData = {

      status: candidate.status,

      assignedTo: candidate.assignedTo || null,

      followUpDate:
        candidate.followUpDate || null,

      internalNotes:
        candidate.internalNotes || null

    };


    this.dashboardService
      .updateCandidate(
        candidate.id,
        updateData
      )
      .subscribe({

        next: () => {

          this.updatingCandidateId = null;

          this.loadDashboard();

        },

        error: (error: any) => {

          console.error(
            'Candidate update error:',
            error
          );

          this.updatingCandidateId = null;

        }

      });

  }


  // ==========================================
  // Update Corporate Lead
  // ==========================================

  updateCorporateLead(lead: any): void {

    if (!lead?.id) {

      return;

    }

    this.updatingCorporateLeadId = lead.id;


    const updateData = {

      status: lead.status,

      assignedTo: lead.assignedTo || null,

      followUpDate:
        lead.followUpDate || null,

      internalNotes:
        lead.internalNotes || null

    };


    this.dashboardService
      .updateCorporateLead(
        lead.id,
        updateData
      )
      .subscribe({

        next: () => {

          this.updatingCorporateLeadId = null;

          this.loadDashboard();

        },

        error: (error: any) => {

          console.error(
            'Corporate lead update error:',
            error
          );

          this.updatingCorporateLeadId = null;

        }

      });

  }


  // ==========================================
  // Filtered Candidates
  // ==========================================

  getFilteredCandidates(): any[] {

    const search =
      this.candidateSearch
        .trim()
        .toLowerCase();

    return this.candidates().filter(candidate => {

      const matchesSearch =
        !search ||
        candidate.fullName
          ?.toLowerCase()
          .includes(search) ||
        candidate.mobile
          ?.toLowerCase()
          .includes(search) ||
        candidate.skills
          ?.toLowerCase()
          .includes(search) ||
        candidate.currentCity
          ?.toLowerCase()
          .includes(search);

      const matchesStatus =
        this.candidateStatusFilter === 'All' ||
        candidate.status ===
          this.candidateStatusFilter;

      return matchesSearch && matchesStatus;

    });

  }


  // ==========================================
  // Filtered Corporate Leads
  // ==========================================

  getFilteredCorporateLeads(): any[] {

    const search =
      this.corporateSearch
        .trim()
        .toLowerCase();

    return this.corporateLeads().filter(lead => {

      const matchesSearch =
        !search ||
        lead.companyName
          ?.toLowerCase()
          .includes(search) ||
        lead.contactPerson
          ?.toLowerCase()
          .includes(search) ||
        lead.businessEmail
          ?.toLowerCase()
          .includes(search) ||
        lead.mobile
          ?.toLowerCase()
          .includes(search) ||
        lead.location
          ?.toLowerCase()
          .includes(search);

      const matchesStatus =
        this.corporateStatusFilter === 'All' ||
        lead.status ===
          this.corporateStatusFilter;

      return matchesSearch && matchesStatus;

    });

  }


  // ==========================================
  // Get Logged-in Admin Name
  // ==========================================

  getUsername(): string {

    return (
      localStorage.getItem('adminUsername') ||
      localStorage.getItem('adminEmail') ||
      'Admin'
    );

  }


  // ==========================================
  // Logout
  // ==========================================

  logout(): void {

    localStorage.removeItem('adminToken');

    localStorage.removeItem('adminUsername');

    localStorage.removeItem('adminEmail');

    localStorage.removeItem('adminRole');

    this.router.navigate(['/login']);

  }

}