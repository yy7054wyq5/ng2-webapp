import { Router } from '@angular/router';
import { DialogService } from './../../service/dialog.service';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import * as Cookies from 'js-cookie';

@Component({
  selector: 'app-guide-list',
  templateUrl: './guide-list.component.html',
  styleUrls: ['./guide-list.component.less']
})
export class GuideListComponent implements OnInit, OnChanges {
  guidesConTranslateLeft: string; // 导购框移动样式
  _guidesConMove = 0; // 导购框移动距离
  outData = {
    toggle: false
  };
  _guideId: number;

  @Input() guides: Array<object>;
  @Input() toggle: boolean;
  @Output() outGuideToggleValue: EventEmitter<object> = new EventEmitter<object>();

  constructor(
    public api: ApiService,
    public dialog: DialogService,
    public router: Router
  ) { }

  outShadowToggleValue(action: false) {
    this.outData.toggle = action;
    this.toggle = action;
    this.outGuideToggleValue.emit(this.outData);
  }

  guidesSwipeLeft(e: any) {
    const max: number = this.guides.length;
    if (this._guidesConMove === -6.48 * (max - 1)) {
      return;
    }
    this._guidesConMove -= 6.48;
    this.guidesConTranslateLeft = 'translate3d(' + this._guidesConMove + 'rem, 0rem, 0rem)';
  }

  guidesSwipeRight(e: any) {
    if (this._guidesConMove === 0) {
      return;
    }
    this._guidesConMove += 6.48;
    this.guidesConTranslateLeft = 'translate3d(' + this._guidesConMove + 'rem, 0rem, 0rem)';
  }

  chooseGuide(id: number) {
    this._guideId = id;
    this.api
      .ajax({
        method: 'post',
        url: '/api/branch/setguide',
        body: {
          guideId: id,
          userId: Cookies.getJSON('userInfo').userId
        },
        downNewUserInfo: true
      })
      .subscribe(res => {
        if (res.success) {
          this.dialog.open(res.msg);
          if (this.router.url !== '/mine/guide') {
            this.router.navigate(['/index']);
          } else {
            for (let index = 0; index < this.guides.length; index++) {
              if (this._guideId === this.guides[index]['id']) {
                this.outData['guide'] = this.guides[index];
                this.outGuideToggleValue.emit(this.outData);
                return;
              }
            }
          }
        }
      });
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }
}
