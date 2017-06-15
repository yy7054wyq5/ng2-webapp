import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent implements OnInit {
  appTag = window['appTag'];
  defaultImage = 'assets/lazy_default.png';

  @Input() productList: Array<object>;
  @Input() disBlock: boolean;
  @Input() productType: string;

  constructor() { }

  ngOnInit() {
  }

}
