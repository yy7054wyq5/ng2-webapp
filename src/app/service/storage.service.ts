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
    let key: string = param.key;
    let localData: string = localStorage.getItem(key);
    if(!localData){
      localData = sessionStorage.getItem(key);
    }
    return JSON.parse(localData);
  }
}
