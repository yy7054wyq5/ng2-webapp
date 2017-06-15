import { ApiService } from './../../share/service/api.service';
import { TranslatePipe } from './../../share/pipe/translate.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as Cookies from 'js-cookie';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.less']
})
export class MessageDetailComponent implements OnInit {
  appTag: string = window['appTag'];
  headerTitle: string;
  messageDetail: Array<object>;
  minHeight: number = window.innerHeight;

  constructor(
    public activeRoute: ActivatedRoute,
    public translate: TranslatePipe,
    public api: ApiService,
    public router: Router
  ) { }

  jumpView(id: number, type: number) {
    if (type === 1) {
      this.router.navigate([this.appTag + '/product/detail', id]);
    } else if (type === 2) {
      this.router.navigate([this.appTag + '/article/articleDetail', id]);
    }else{
      console.log('...');
    }
  }

  ngOnInit() {
    this.activeRoute.params
      .subscribe(res => {
        if (res.type === '1') {
          this.headerTitle = this.translate.transform('product');
        } else if (res.type === '2') {
          this.headerTitle = this.translate.transform('article');
        } else {
          this.headerTitle = this.translate.transform('sys');
        }
        this.api
          .ajax({
            method: 'get',
            url: '/api/account/messages',
            body: {
              resourceType: res.type,
              userId: Cookies.getJSON('userInfo').userId
            }
          })
          .subscribe(back => {
            if (back.success) {
              this.messageDetail = back.content.messages;
            }
          });
      });
  }

}
