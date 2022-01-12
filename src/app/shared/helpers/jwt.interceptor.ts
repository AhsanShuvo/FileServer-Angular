import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isLoggedIn = this.auth.isLoggedIn();
    if (isLoggedIn) {
      const tokenInfo = this.auth.getToken();
      request = request.clone({
          setHeaders: {
              Authorization: `Bearer ${tokenInfo}`
          }
      });
    }
    return next.handle(request)
    .pipe(catchError(err => {
      if (err.status === 401) {
        this.auth.clearSession();
        location.reload(true);
      }
      return throwError(err);
    }));
  }
}