import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from '../class/hero';

@Injectable()
export class HeroService {

  constructor(private http: Http) { }


}
