import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpService {

  constructor(
    public http: Http,
  ) { }

}
