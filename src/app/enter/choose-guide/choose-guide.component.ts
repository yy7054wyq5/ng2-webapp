import { DialogService } from './../../share/service/dialog.service';
import { ApiService } from './../../share/service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as Cookies from 'js-cookie';

@Component({
  selector: 'app-choose-guide',
  templateUrl: './choose-guide.component.html',
  styleUrls: ['./choose-guide.component.less']
})
export class ChooseGuideComponent implements OnInit {
  loadBody = {
    page: 1
  };
  list: Array<object>;
  toggle: boolean;
  guides: Array<object>;

  constructor(
    public activeRoute: ActivatedRoute,
    public api: ApiService,
    public dialog: DialogService,
    public router: Router
  ) { }

  outGuideToggleValue(action: object) {
    this.toggle = action['toggle'];
  }

  refreshData(action: Array<object>) {
    this.list = action['branches'];
  }

  loadData(action: Array<object>) {
    this.list = this.list.concat(action);
  }

  getGuideList(id: number) {
    this.toggle = true;
    this.api
      .ajax({
        method: 'post',
        url: '/api/branch/guide/' + id
      })
      .subscribe(res => {
        if (res.success) {
          this.guides = res.content;
        }
      });
  }

  ngOnInit() {
    this.activeRoute.data
      .subscribe(res => {
        this.list = res.content.branches;
      });
  }

}
