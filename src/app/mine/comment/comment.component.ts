import { ApiService } from './../../share/service/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as Cookies from 'js-cookie';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.less']
})
export class CommentComponent implements OnInit {
  type: string;
  defaultImage = 'assets/img/lazy_default.png';
  myProductComment: Array<object>;
  userInfo: object = Cookies.getJSON('userInfo');
  constructor(
    public activeRoute: ActivatedRoute,
    public api: ApiService
  ) { }

  ngOnInit() {
    this.activeRoute.queryParams
      .subscribe(res => {
        this.type = res.type;
        if (this.type === 'product') {
          this.api
            .ajax({
              method: 'post',
              url: '/api/comment/mine',
              body: {
                page: 1,
                tag: 3,
                userId: this.userInfo['userId']
              }
            })
            .subscribe(back => {
              if (back.status) {
                this.myProductComment = back.content.comments;
              }
            });
        }
      });
  }

}
