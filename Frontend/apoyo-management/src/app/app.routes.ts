import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Services } from './pages/services/services';
import { HireWorkforce } from './pages/hire-workforce/hire-workforce';
import { ApplyJobs } from './pages/apply-jobs/apply-jobs';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'about',
    component: About
  },
  {
    path: 'services',
    component: Services
  },
  {
    path: 'hire-workforce',
    component: HireWorkforce
  },
  {
    path: 'apply-jobs',
    component: ApplyJobs
  },
  {
  path: 'dashboard',
  component: Dashboard,
  canActivate: [adminGuard]
},
  {
  path: 'login',
  component: Login
},
  {
    path: '**',
    redirectTo: ''
  }
];