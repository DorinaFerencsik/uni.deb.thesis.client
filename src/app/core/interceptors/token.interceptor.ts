import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // FIXME: set token only on own API requests
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return next.handle(request);
  }
}
