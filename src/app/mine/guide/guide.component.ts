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
  appTag: string = window['appTag'];
  guides: Array<object>;
  toggle = false;
  constructor(
    public activeRoute: ActivatedRoute,
    public api: ApiService,
    public storage: StorageService
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
        method: 'get',
        url: '/api/branch/guide/' + id
      })
      .subscribe(res => {
        if (res.success) {
          this.guides = res.content;
          this.toggle = true;
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
        method: 'get',
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
