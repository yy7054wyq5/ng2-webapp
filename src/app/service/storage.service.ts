import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }
  put(param: any): void {
    let data: any = param.data; // 数据
    const key: string = param.key; // 约定的key
    const type: string = param.type; // 存储类型
    data = typeof data === 'object' ? data = JSON.stringify(data) : data;
    if (type === 'localStorage') {
      localStorage.setItem(key, data);
    }else {
      sessionStorage.setItem(key, data);
    }
  };
  get(key: string): Object {
    let localData: string = localStorage.getItem(key);
    if (!localData) {
      localData = sessionStorage.getItem(key);
    }

    if (localData && localData.toString().indexOf('{') > -1) {
      return JSON.parse(localData);
    }else {
      return localData;
    }
  };
  remove(keys: string): void { // key1,key2,key3
    const keysList: Array<string> = keys.split(',');
    for (let index = 0; index < keysList.length; index++) {
      localStorage.removeItem(keysList[index]);
      sessionStorage.removeItem(keysList[index]);
    }
  };
  clear(): void {
    localStorage.clear();
    sessionStorage.clear();
  }
}
