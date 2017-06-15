import { TranslatePipe } from './../pipe/translate.pipe';
import { DialogService } from './../service/dialog.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as Cookies from 'js-cookie';

@Injectable()
export class IsLoginGuard implements CanActivate {
  constructor(
    public dialogService: DialogService,
    public translatePipe: TranslatePipe,
    public router: Router
  ) { }

  _isLogin() {
    const userInfo: string = Cookies.get('userInfo');
    if (userInfo) {
      return true;
    }
    this.dialogService.open(this.translatePipe.transform('please_login_before'));
    this.router.navigate(['/' + window['appTag'] + '/login']);
    return false;
  }

  /**
   * true 已成功登录
   * false 还没有登录
   */
  isLogin(): boolean {
    return this._isLogin();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._isLogin();
  }

}
