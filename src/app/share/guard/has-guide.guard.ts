import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as Cookies from 'js-cookie';

@Injectable()
export class HasGuideGuard implements CanActivate {

  constructor(
    public router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const userInfo: object = Cookies.getJSON('userInfo');
    const chooseGuideUrl = '/choose-guide';
    if (userInfo) {
      if (userInfo['guideId']) {
        return true;
      }
      this.router.navigate([chooseGuideUrl]);
      return false;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
