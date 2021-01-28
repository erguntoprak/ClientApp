import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,

  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { take, exhaustMap, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { AuthService } from './auth.service';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AcdcLoadingService } from 'acdc-loading';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router, private acdcLoadingService: AcdcLoadingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.currentUserSubject.pipe(
      take(1),
      exhaustMap(user => {
        let modifiedReq;
        if (user) {
          modifiedReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${user.token}`),
          });
        }
        else {
          modifiedReq = req;
        }
        return next.handle(modifiedReq).pipe(
          catchError((error: HttpErrorResponse) => {
            switch (error.status) {
              case 400:
                Swal.fire({
                  icon: 'error',
                  title: 'Başarısız!',
                  text: error.error.message
                });
                this.acdcLoadingService.hideLoading();
                break;
              case 404:
                this.router.navigateByUrl("/sayfa-bulunamadi", { skipLocationChange: true });
                this.acdcLoadingService.hideLoading();
                break;
              case 401:
                localStorage.removeItem('currentUser');
                this.router.navigateByUrl("/giris-yap");
                this.acdcLoadingService.hideLoading();
                break;
              case 403:
                Swal.fire({
                  icon: 'error',
                  title: 'Başarısız!',
                  text: error.error
                });
                this.acdcLoadingService.hideLoading();
                break;
              case 500:
                Swal.fire({
                  icon: 'error',
                  title: 'Başarısız!',
                  text: "Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin."
                });
                this.acdcLoadingService.hideLoading();
                break;
            }
            return throwError(error);
          }));
      })
    );
  }
}
