// auth.interceptor.ts
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

export function authInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  const localStorage = inject(LocalStorageService);
  const token = localStorage.getItem('token');

  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(request);
}
