import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  constructor(
    public http: Http,
  ) { }

  ajax(options) {
    return this.http.request(options.url, options)
            .subscribe(
              (res: Response) => {
                return res.json();
              }
            );
  };

}
