import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from './../../share/service/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.less']
})
export class AboutUsComponent implements OnInit {
  app: object = window['appInfo'];
  appId: number = window['appId'];
  us: any;

  constructor(
    public api: ApiService,
    public santizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.api
      .ajax({
        method: 'post',
        url: '/api/public/about/' + this.appId
      })
      .subscribe(res => {
        this.us = this.santizer.bypassSecurityTrustHtml(res.content);
      });
  }

}
