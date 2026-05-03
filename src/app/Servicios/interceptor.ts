import { HttpInterceptorFn } from '@angular/common/http';

export const interceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken');

  console.log('INTERCEPTOR ACTIVO');
  console.log('TOKEN:', token);
  console.log('URL:', req.url);

  if (req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
    return next(req);
  }

  if (token) {
    const reqClonada = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('HEADER AUTH ENVIADO');

    return next(reqClonada);
  }

  return next(req);
};