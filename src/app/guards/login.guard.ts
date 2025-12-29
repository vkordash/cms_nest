import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { SiteService } from '../http.service';
//import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate {
  constructor(private http: SiteService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let logged = this.http.isLogin();

    if (logged) {
      return true;
    }
    this.router.navigate(['/login']);
    alert('You must login to the system to access the page.!');
    return false;
  }
}
/*export class LoginGuard implements CanActivate {
  constructor(private authservice: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let logged = this.authservice.isAuthenticated();

    if (logged) {
      return true;
    }
    this.router.navigate(['/login']);
    alert('You must login to the system to access the page.!');
    return false;
  }
}*/