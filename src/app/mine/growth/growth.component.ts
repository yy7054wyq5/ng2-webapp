import { ApiService } from './../../share/service/api.service';
import { Component, OnInit } from '@angular/core';
import * as Cookies from 'js-cookie';

@Component({
  selector: 'app-growth',
  templateUrl: './growth.component.html',
  styleUrls: ['./growth.component.less']
})
export class GrowthComponent implements OnInit {
  userInfo: any = Cookies.getJSON('userInfo');
  growth: Array<object>;
  userGrowth: number;
  nextLevelGrowth: number;
  nextRankNeedScore: number;
  creditRecordList: Array<object>;
  growthLength: number;
  userLevel: number;

  previousLevelGrowth;
  constructor(
    public api: ApiService
  ) { }

  ngOnInit() {
    // 获取等级信息
    this.api
      .ajax({
        method: 'post',
        url: '/api/account/ranks',
        body: {
          userId: this.userInfo['userId']
        }
      })
      .subscribe(res => {
        if (res.success) {
          this.growth = res.content.ranks;
          this.nextRankNeedScore = res.content.nextRankNeedScore;
          this.userGrowth = this.userInfo['growthScore']; // 用户当前成长值
          let times = 0; // 用户当前等级
          const oneWidth: number = parseFloat(parseFloat((9.2 / this.growth.length).toString()).toFixed(1));
          // 利用循环的次数得出当前等级
          for (let index = 0; index < this.growth.length; index++) {
            if (this.userGrowth >= this.growth[index]['startCredit']) {
              times += 1;
            }
          }
          const growthIndex: number = times; // 当前用户等级
          const previousLevelGrowth: number = this.growth[growthIndex - 1]['startCredit']; // 上一个等级所对应的成长值
          this.userLevel = times;
          if (this.growth.length <= times) {
            this.growthLength = 9.2; // 总长为9.2rem
            this.nextLevelGrowth = previousLevelGrowth;
            this.userLevel = this.userLevel - 1;
            console.log(this.userLevel);
          } else {
            this.nextLevelGrowth = this.growth[growthIndex]['startCredit']; // 下一个等级所对应的成长值
            this.growthLength = ((this.userGrowth - previousLevelGrowth) / (this.nextLevelGrowth - previousLevelGrowth)
              + growthIndex) * oneWidth;

          }
        }
      });



    this.api
      .ajax({
        method: 'post',
        url: '/api/account/creditrecord',
        body: {
          type: 1,
          userId: this.userInfo['userId'],
          page: 1
        }
      })
      .subscribe(res => {
        if(res.success){
          this.creditRecordList = res.content.records;
        }
      });

  }

}
