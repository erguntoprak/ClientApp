import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
  CanLoad,
  UrlSegment,
  Route
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {

    return this.authService.currentUser.pipe(
      take(1),
      map(user => {
        let accessPermission = false;
        const isAuth = !!user;
        if (isAuth) {
          const roles = user.roles;
          roles.forEach(role => {
            if (route.data.roles && route.data.roles.includes(role)) {
              accessPermission = true;
            }
          });
          return accessPermission;
        }
        this.router.navigate(['/giris']);
        return false;
      })
    );
  }
}
