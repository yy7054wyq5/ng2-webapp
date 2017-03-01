import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ResolverService implements Resolve<any> {

  constructor(
    private api: ApiService,
    private router: Router
  ) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const apiUrl = '/api/product/detail';
    const id = route.params['id'];
    return this.api.ajax({
      method: 'get',
      url: apiUrl + '/' + id,
      options: {
        sign: 'beb790d872f5b20202c7d4e98119c54d'
      }
    });
    // .switchMap(res => {
    //   if (res.success) {
    //     return res.content;
    //   } else { // id not found
    //     this.router.navigate(['']);
    //     return null;
    //   }
    // });
  }
}
