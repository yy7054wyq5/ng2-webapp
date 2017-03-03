import { StorageService } from './../../share/storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.less']
})
export class LoaderComponent implements OnInit {
  isloading;
  constructor(
    private storage: StorageService
  ) { }

  ngOnInit() {
    const loadingBoolTime = setInterval(() => {
      const loadingStatus = this.storage.get('loadingStatus');
      if (loadingStatus) {
        this.isloading = true;
      }else {
        this.isloading = false;
      }
    }, 500);
  }

}
