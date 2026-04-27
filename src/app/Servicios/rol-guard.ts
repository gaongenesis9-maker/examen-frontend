import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const rolGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  const rol = (localStorage.getItem('rol') || '').toUpperCase();

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  const url = state.url;

  if (rol === 'ADMIN') {
    return true;
  }

  if (rol === 'PACIENTE') {
    if (url.startsWith('/consultas')) {
      return true;
    }
    router.navigate(['/consultas']);
    return false;
  }

  if (rol === 'MEDICO') {
    if (url.startsWith('/consultas')) {
      return true;
    }
    router.navigate(['/consultas']);
    return false;
  }

  router.navigate(['/login']);
  return false;
};