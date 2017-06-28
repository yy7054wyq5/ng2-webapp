import { TranslatePipe } from './../../share/pipe/translate.pipe';
import { DialogService } from './../../share/service/dialog.service';
import { StorageService } from './../../share/service/storage.service';
import { ApiService } from './../../share/service/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.less']
})
export class GuideComponent implements OnInit {
  branchInfo: any;
  list: Array<object>;
  guides: Array<object>;
  toggle = false;
  constructor(
    private activeRoute: ActivatedRoute,
    private api: ApiService,
    private storage: StorageService,
    private dislog: DialogService,
    private translate: TranslatePipe
  ) { }

  outGuideToggleValue(action: object) {
    this.toggle = action['toggle'];
    if (action['guide']) {
      delete this.branchInfo['mobile'];
      delete this.branchInfo['guideImagePath'];
      Object.assign(this.branchInfo, action['guide']);
    }
  }

  setGuide(id: number) {
    this.api
      .ajax({
        method: 'post',
        url: '/api/branch/guide/' + id
      })
      .subscribe(res => {
        if (res.success && res.content) {
          this.guides = res.content;
          this.toggle = true;
        } else {
          this.dislog.open(this.translate.transform('no_data'));
        }
      });
  }

  ngOnInit() {
    this.activeRoute.data
      .subscribe(res => {
        this.branchInfo = res.content;
      });

    this.api
      .ajax({
        method: 'post',
        url: '/api/public/problems'
      })
      .subscribe(res => {
        if (res.success) {
          this.list = res.content.problems;
          this.storage.put({
            key: 'problems',
            data: res.content.problems,
            type: 'sessionStorage'
          });
        }
      });
  }

}
