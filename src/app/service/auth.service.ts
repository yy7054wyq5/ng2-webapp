import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    // alert('没有权限');
    console.log('AuthGuard#canActivate called');
    return true;
  }
  canLoad(): boolean {
    console.log('懒加载模块');
    return true;
  }
}
