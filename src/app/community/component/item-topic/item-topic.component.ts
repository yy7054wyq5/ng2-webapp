import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-topic',
  templateUrl: './item-topic.component.html',
  styleUrls: ['./item-topic.component.less']
})
export class ItemTopicComponent implements OnInit {


  /**
   * item的数据
   */
  @Input()
  data: any;

  constructor() { }

  ngOnInit() {

  }

  /**
   * ev.stopPropagation() 阻止事件冒泡
   * @param ev 查看大图
   */
  viewBigPicture(ev, data) {
    ev.stopPropagation();
    console.log('---------');
  }

}
