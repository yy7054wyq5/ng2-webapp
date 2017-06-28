import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import {
  Router,
  NavigationExtras,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { appTag } from '../../../ready';

@Injectable()
export class GlobalParamForChildGuard implements CanActivateChild {

  constructor(
    private router: Router
  ) { }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (state.url.indexOf(appTag) < 0) {
      const params = next.queryParams;
      const newParams = {
        queryParams: { 'appTag': appTag }
      };
      // 全局查询参数
      const navigationExtras: NavigationExtras = {
        queryParams: { 'appTag': appTag }
      };
      let newUrl = '';
      if (Object.keys(params).length > 0) {
        Object.assign(newParams.queryParams, params);
        newUrl = state.url;
        const index = newUrl.lastIndexOf('?');
        newUrl = newUrl.substring(0, index);
      } else {
        newUrl = state.url;
      }
      this.router.navigate([newUrl], newParams);
      return false;
    }
    return true;
  }
}
