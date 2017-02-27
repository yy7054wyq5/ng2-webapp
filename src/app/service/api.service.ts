import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { LoaderService } from './loader.service';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  constructor(
    public http: Http,
    public loader: LoaderService,
  ) { }

  ajax(options) {
    const loader = this.loader;
    loader.open();
    return this.http.request(options.url, options)
            .subscribe(
              (res: Response) => {
                loader.close();
                return res.json();
              }
            );
  };

}
