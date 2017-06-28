import { ApiService } from './../../share/service/api.service';
import { Component, OnInit } from '@angular/core';
import * as Cookies from 'js-cookie';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.less']
})
export class MessageComponent implements OnInit {
  message = [];
  userId: number = Cookies.getJSON('userInfo').userId;
  loadBody = {
    userId: this.userId,
    page: 1
  };
  msgBg: string;
  constructor(
    public api: ApiService
  ) { }

  refreshData(action: object) {
    this.message = [];
    this._objectToArray(action, this.message);
  }

  deleteMessage(type: number) {
    this.api
      .ajax({
        method: 'delete',
        url: '/api/account/deletemessage',
        body: {
          resourceType: type,
          userId: this.userId
        }
      })
      .subscribe(res => {
        if (res.success) {
          for (let index = 0; index < this.message.length; index++) {
            if (this.message[index].resourceType === type) {
              this.message.splice(index, 1);
            }
          }
        }
      });
  }

  _objectToArray(obj: object, arr: Array<object>) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const child: object = obj[key];
        if (Object.keys(child).length !== 0) {
          arr.push(obj[key]);
        }
      }
    }
  }

  ngOnInit() {
    this.api
      .ajax({
        method: 'post',
        url: '/api/account/messagegather',
        body: {
          userId: this.userId
        }
      })
      .subscribe(res => {
        if (res.success) {
          this._objectToArray(res.content, this.message);
          if (this.message.length === 0) {
            this.msgBg = '#fff';
          }
        }
      });
  }

}
