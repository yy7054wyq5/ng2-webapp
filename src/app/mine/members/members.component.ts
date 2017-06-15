import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as Cookies from 'js-cookie';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.less']
})
export class MembersComponent implements OnInit {
  members: Array<object>;
  membersTotal: number;
  userInfo: object = Cookies.getJSON('userInfo');
  body = {
    userId: this.userInfo['userId'],
    page: 1
  };
  constructor(
    public activeRoute: ActivatedRoute
  ) { }

  refreshData(action: Array<object>) {
    this.members = action;
  }

  loadData(action: Array<object>) {
    this.members = this.members.concat(action);
  }

  ngOnInit() {
    this.activeRoute.data
      .subscribe(res => {
        this.membersTotal = res.content.cnt;
        this.members = res.content.users;
        // 打*号
        for (let index = 0; index < this.members.length; index++) {
          const member: object = this.members[index];
          const sourceMobileByHide: string = member['mobile'].substring(3, 7);
          member['mobile'] = member['mobile'].replace(sourceMobileByHide, '****');
        }
      });
  }

}
