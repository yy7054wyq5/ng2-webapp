import { Injectable } from '@angular/core';

@Injectable()
export class storageService {

  constructor() { }
  put(param: any): void{
    let data = param.data;
    if(typeof param.data =='object'){
      param.data = JSON.stringify(data);
    }
    if(param.type =='local'){
      localStorage.setItem(param.key,data);
    }
    sessionStorage.setItem(param.key,data);
  };
  get(param: any): any{
    return JSON.parse(localStorage.getItem(param.key));
  }
}
