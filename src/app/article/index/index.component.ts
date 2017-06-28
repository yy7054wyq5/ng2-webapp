import { Component, OnInit } from '@angular/core';
import * as Cookies from 'js-cookie';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class ArticleIndexComponent implements OnInit {

  /**
   * 文章分类123
   */
  articleLevel = 0;

  constructor() {
    this.articleLevel = window['appInfo'].articleLevel;
  }

  ngOnInit() {
    // console.log(Cookies.get('userInfo'));


  }

}
