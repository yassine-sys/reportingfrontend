import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { AuthService } from './services/auth.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class authGuard2 implements CanActivate {
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const jwtToken = this.cookieService.get('jwtToken');
    if (jwtToken) {
      return this.authService.getUser().pipe(
        map((user: any) => {
          if (user && user.role && user.role.role === 'Admin') {
            return true;
          } else {
            this.router.navigate(['/unauthorized']);
            return false;
          }
        }),
        catchError((err) => {
          this.cookieService.deleteAll();
          this.router.navigate(['/login']);
          return of(false);
        })
      );
    } else {
      this.cookieService.deleteAll();
      this.router.navigate(['/login']);
      return false;
    }
  }
}
