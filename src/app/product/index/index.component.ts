import { flyIn } from './../../animation/fly-in';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
  animations: [flyIn]
})
export class ProductIndexComponent implements OnInit {
  list;
  defaultImage = 'assets/lazy_default.png';
  body;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe(res => {
        this.body = res['body'];
        this.list = res['content'].products;
      });
  }

}
