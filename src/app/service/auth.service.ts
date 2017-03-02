import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate() {
    // alert('没有权限');
    console.log('AuthGuard#canActivate called');
    return true;
  }
}
