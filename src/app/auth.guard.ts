import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, tap } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
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
    if (!jwtToken) {
      console.log('No JWT token found, redirecting to login page.');
      this.router.navigate(['/login']);
      return false;
    }

    return this.authService.checkToken().pipe(
      tap((isValid) => {
        if (!isValid.valid) {
          console.log(
            'Token is invalid or expired, redirecting to login page.'
          );
          this.cookieService.deleteAll();
          this.router.navigate(['/login']);
        } else {
          console.log('Token is valid, allowing access.');
        }
      }),
      catchError((err) => {
        console.error('Error occurred while checking token:', err);
        return [false];
      })
    );
  }
}
