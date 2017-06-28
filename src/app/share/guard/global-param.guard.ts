import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { appTag } from '../../../ready';

@Injectable()
export class GlobalParamGuard implements CanActivate {
  constructor(
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (state.url.indexOf(appTag) < 0) {
      this.router.navigate([state.url], { queryParams: { 'appTag': appTag }});
      return false;
    }
    return true;
  }
}
