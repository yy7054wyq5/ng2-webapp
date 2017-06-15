import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../../share/service/api.service';
import { Component, OnInit } from '@angular/core';
import * as Cookies from 'js-cookie';

@Component({
  selector: 'app-user-topic',
  templateUrl: './user-topic.component.html',
  styleUrls: ['./user-topic.component.less']
})
export class UserTopicComponent implements OnInit {

  appTag: string = window['appTag'];

  /**
   * 选中position 0表示我的帖子  1表示我的回复
   */
  selectPosition = 0;

  userId = 0;

  constructor(private api: ApiService,
    private router: Router,
    private activeRouter: ActivatedRoute) {
    if (Cookies.get('userInfo') !== undefined) {
      this.userId = JSON.parse(Cookies.get('userInfo')).userId;
    }
  }

  ngOnInit() {
    const self: any = this;
    this.activeRouter.queryParams.subscribe(params => {
      if (params.type === 1 || params.type === 0) {
        self.selectPosition = params.type;
        console.log(self.selectPosition);

      }
    });
  }

  changeUrl(selectPosition: number) {
    this.selectPosition = selectPosition;
    this.router.navigate(['/' + this.appTag + '/mine/userTopic'], { queryParams: { type: selectPosition } });
  }


}
