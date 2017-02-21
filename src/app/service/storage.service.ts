import { Injectable } from '@angular/core';

@Injectable()
export class storageService {

  constructor() { }

  put(param: any): void{
    let data: any = param.data;//数据
    let key: string = param.key;//约定的key
    let type: string = param.type;//存储类型
    if(typeof data =='object'){
      data = JSON.stringify(data);
    }
    if(type =='local'){
      localStorage.setItem(key,data);
    }
    sessionStorage.setItem(key,data);
  };

  get(key: string): any{
    let localData: string = localStorage.getItem(key);
    if(!localData){
      localData = sessionStorage.getItem(key);
    }
    return JSON.parse(localData);
  };

  remove(keys: string): void{//key1,key2,key3
    let keysList: Array<string> = keys.split(',');
    for (var index = 0; index < keysList.length; index++) {
      localStorage.removeItem(keysList[index]);
      sessionStorage.removeItem(keysList[index]);      
    }
  };
  
  clear(): void{
    localStorage.clear();
    sessionStorage.clear();
  }
}
