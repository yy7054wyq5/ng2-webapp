import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.less']
})
export class BranchComponent implements OnInit {

  list: Array<object>;
  loadBody = {
    page: 1,
    pageCount: 10
  };

  constructor(
    private route: ActivatedRoute
  ) { }

  loadData(action: object) {
    this.list = this.list.concat(action);
  }

  refreshData(action: Array<object>) {
    this.list = action;
  }

  ngOnInit() {
    this.route.data
      .subscribe(res => {
        this.list = res.content.branches;
      });
  }

}
