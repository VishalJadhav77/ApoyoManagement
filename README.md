# Workforce & Recruitment Management System

A full-stack web application developed for managing corporate workforce requirements and candidate job applications.

The system provides a public-facing website where companies can submit workforce requirements and candidates can apply for job opportunities. It also provides a secure Admin Dashboard where administrators can manage candidates, corporate leads, resumes, statuses, assignments, follow-ups, and internal notes.

---

## 🚀 Project Overview

The Workforce & Recruitment Management System is designed to simplify the process of collecting and managing:

- Corporate workforce requirements
- Candidate job applications
- Candidate resumes
- Corporate leads
- Lead/application statuses
- Admin assignments
- Follow-up dates
- Internal notes

The application has two main sides:

### Public Website

Users can:

- View Home page
- View About page
- View Services
- Submit workforce requirements
- Apply for jobs
- Upload resumes

### Admin Portal

Administrators can:

- Login securely
- Access the Admin Dashboard
- View candidate applications
- View corporate leads
- Search and filter records
- View/download candidate resumes
- Update candidate information
- Update corporate lead information
- Assign records to admins
- Set follow-up dates
- Add internal notes
- Delete candidate applications
- Delete corporate leads
- Create and manage admin users

---

## 🛠️ Technology Stack

### Frontend

- Angular
- TypeScript
- HTML5
- CSS3
- Angular Reactive Forms
- Angular Router
- Angular Signals
- HttpClient
- HTTP Interceptor

### Backend

- ASP.NET Core Web API
- .NET 8
- C#
- Entity Framework Core
- RESTful APIs
- JWT Authentication
- Role-Based Authorization

### Database

- Microsoft SQL Server
- Entity Framework Core
- EF Core Migrations

### Development Tools

- Visual Studio
- Visual Studio Code
- SQL Server / LocalDB
- Swagger / OpenAPI
- Git
- GitHub

---

# 🏗️ Application Architecture

The application follows a layered full-stack architecture:

```text
                    Angular Frontend
                           |
                           | HTTP Request
                           ↓
                ASP.NET Core Web API
                           |
                           ↓
                 Entity Framework Core
                           |
                           ↓
                    SQL Server