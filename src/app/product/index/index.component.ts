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
  lineLeaveLeft;
  timeDirection;
  saleDirection;
  priceDirection;
  constructor(
    private route: ActivatedRoute
  ) { }

  changeDirection(direction) {
    if (!direction) {
      direction = 1;
    } else if (direction === 1) {
      direction = 2;
    } else if (direction === 2) {
      direction = 1;
    }
    return direction;
  }

  search(num: number) {
    this.lineLeaveLeft = num;
    switch (num) {
      case 2:
        this.timeDirection = this.changeDirection(this.timeDirection);
        this.saleDirection = null;
        this.priceDirection = null;
        break;
      case 4:
        this.timeDirection = null;
        this.saleDirection = this.changeDirection(this.saleDirection);
        this.priceDirection = null;
        break;
      case 6:
        this.timeDirection = null;
        this.saleDirection = null;
        this.priceDirection = this.changeDirection(this.priceDirection);
        break;
      default:
        break;
    }
  }

  ngOnInit() {
    this.route.data
      .subscribe(res => {
        this.list = res['content'].products;
      });
  }

}
