import { ApiService } from './../../share/service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as Cookies from 'js-cookie';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less']
})
export class CalendarComponent implements OnInit {
  allDays: Array<Array<number>>;
  year = new Date().getFullYear();
  _startDate: string;
  startMonth: number;
  startDay: number;
  _endDate: string;
  endMonth: any; // 处理逻辑时赋值为''
  endDay: any; // 处理逻辑时赋值为''
  userInfo: any = Cookies.getJSON('userInfo');
  calendarMarginTop = 0;
  payState: number;
  tag: number; // 1为普通产品，2为积分产品
  type: number; // 1为我的订单列表，2角色订单列表
  constructor(
    public router: Router,
    public api: ApiService,
    public activeRoute: ActivatedRoute
  ) {
    // 分店管理员
    if (this.userInfo['roleTag'] === 'BranchAdmin') {
      this.calendarMarginTop = 1;
      this.payState = -1; // 支付状态
      this.tag = 1; // 1为普通订单，2为积分订单
      this.type = 2; // 门店管理员从订单列表获取，单独需要一个type = 2的值
    }
  }

  /*
  * 将数值转换为数字数组
  * 比如是3，转换为[0,1,2]
  */
  _setDays(days: number): Array<number> {
    const daysArray = [];
    for (let i = 0; i < days; i++) {
      daysArray[i] = i + 1;
    }
    return daysArray;
  }

  /*
  * 比较时间大小
  */
  _battleDate(start: string, end: string): boolean {
    const timeStart = Date.parse(start);
    const tiemEnd = Date.parse(end);
    if (tiemEnd > timeStart) {
      return true;
    }
    return false;
  }

  /*
  * 选择日期
  */
  chooseDay(year: number, month: number, day: number) {
    const date: string = year + '-' + month + '-' + day;
    if (!this._startDate && !this._endDate) {
      this._startDate = date;
      this.startMonth = month;
      this.startDay = day;
    } else if (this._startDate && !this._endDate) {
      if (this._battleDate(this._startDate, date)) {
        this._endDate = date;
        this.endMonth = month;
        this.endDay = day;
      }
    } else {
      this._startDate = date;
      this.startMonth = month;
      this.startDay = day;
      this.endMonth = '';
      this.endDay = '';
      this._endDate = '';
    }
    // console.log('开始日期:' + this._startDate);
    // console.log('结束日期:' + this._endDate);
    if (this._startDate && this._endDate) {
      this.router.navigate(['/mine'], {
        queryParams: {
          timeStart: Date.parse(this._startDate) / 1000,
          timeEnd: Date.parse(this._endDate) / 1000,
          type: this.type,
          tag: this.tag,
          payState: this.payState
        }
      });
    }
  }

  _creatCalendar() {
    const months = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 每月的天数
    const moththHaveDays = []; // 每月天数数值转成的数组
    const firstDayInWeek = []; // 每月1号是星期几
    const _firstDayInWeek = []; // 添加了空格
    // 是否为闰年
    if (this.year % 400 === 0 || this.year % 4 === 0 && this.year % 100 !== 0) {
      months[1] = 29;
    } else {
      months[1] = 28;
    };
    // 获取每月1号是星期几
    // 注意：这里j的值在实例化时会自动+1，毋须手动+1
    for (let j = 0; j < 12; j++) {
      const _date = new Date(this.year, j, 1);
      firstDayInWeek[j] = _date.getDay();
    }
    // 将monthDays、firstDayInWeek内的元素转换为数组以便循环
    for (let i = 0; i < 12; i++) {
      moththHaveDays[i] = this._setDays(months[i]);
      firstDayInWeek[i] = this._setDays(firstDayInWeek[i]);
    }
    // 将每月1号的星期数转换为数组并将元素替换为空
    for (let k = 0; k < 12; k++) {
      const trs = firstDayInWeek[k];
      const _trs = [];
      for (let m = 0; m < firstDayInWeek[k].length; m++) {
        _trs[m] = trs[m].toString().replace(/\d/g, ' ');
      }
      _firstDayInWeek[k] = _trs;
    }
    // 合并每月天数和1号星期数
    for (let n = 0; n < 12; n++) {
      moththHaveDays[n] = _firstDayInWeek[n].concat(moththHaveDays[n]);
    }
    this.allDays = moththHaveDays;
  }

  _stampToDate(stamp: string): Date {
    return new Date(parseInt(stamp, 10) * 1000);
  }

  _selectedDayFromUrl() {
    this.activeRoute.queryParams
      .subscribe(res => {
        if (Object.keys(res).length > 0) {
          const startDate: Date = this._stampToDate(res.timeStart);
          const endDate: Date = this._stampToDate(res.timeEnd);
          this.startMonth = startDate.getMonth() + 1;
          this.startDay = startDate.getDate();
          this._startDate = this.year + '-' + this.startMonth + '-' + this.startDay;
          this.endMonth = endDate.getMonth() + 1;
          this.endDay = endDate.getDate();
          this._endDate = this.year + '-' + this.endMonth + '-' + this.endDay;
          this.payState = res.payState;
          this.tag = res.tag;
        }
      });
  }

  ngOnInit() {
    this._creatCalendar();
    this._selectedDayFromUrl();
  }

}
