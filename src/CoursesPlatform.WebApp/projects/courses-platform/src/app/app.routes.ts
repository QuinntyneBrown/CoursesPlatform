import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services';

const authGuard = () => {
  const authService = inject(AuthService);
  return authService.isAuthenticated;
};

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then(m => m.Register)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/forgot-password/forgot-password').then(m => m.ForgotPassword)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile').then(m => m.Profile),
    canActivate: [authGuard]
  },
  {
    path: 'courses',
    loadComponent: () => import('./pages/courses-list/courses-list').then(m => m.CoursesList),
    canActivate: [authGuard]
  },
  {
    path: 'courses/new',
    loadComponent: () => import('./pages/course-create/course-create').then(m => m.CourseCreate),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/login' }
];
