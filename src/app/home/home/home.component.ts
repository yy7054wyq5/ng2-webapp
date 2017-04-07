import { CacheService } from './../../service/cache.service';
import { StorageService } from './../../service/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private storage: StorageService,
    private cache: CacheService
  ) { }

  ngOnInit() {
    this.activeRoute.data
      .subscribe(res => {
        this.storage.put({
          type: 'localStorage',
          key: 'appinfo',
          data: res.appInfo
        });
        this.cache.put('appinfo', res.appInfo);
      });
    this.router.navigateByUrl('index/find');
  }

}
