import { ApiService } from './../../../share/service/api.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-chose-part',
  templateUrl: './chose-part.component.html',
  styleUrls: ['./chose-part.component.less']
})
export class ChosePartComponent implements OnInit {
  // prodata ;
  // 选择城市开关
  flagPart = false;
  citydata = [];
  areadata = [];
  // 城市名称
  proName: string;
  cityName: string;
  areaName: string;
  proId: number;
  cityId: number;
  areaId: number;
  proindex: number;
  cityindex: number;
  areaindex: number;

  @Input() prodata: object;
  @Input() choseData: object;
  @Output() childEvent = new EventEmitter<any>();
  constructor(private api: ApiService) {  }

  ngOnInit() {
    // console.log(this.choseData);
    // 如果是编辑，回填数据
    if (this.choseData) {
      this.proName = this.choseData['province'];
      this.cityName = this.choseData['city'];
      this.areaName = this.choseData['area'];
      this.proId = this.choseData['provinceId'];
      this.cityId = this.choseData['cityId'];
      this.areaId = this.choseData['areaId'];
    }
  }
  // 选择城市开关
  set(boolean: boolean) {
    if (!boolean) {
      this.childEvent.emit({proId: this.proId, cityId: this.cityId, areaId: this.areaId});
    }
    this.flagPart = boolean;
  }

  // 获取城市数据
   achieveData(parentId: number) {
    return this.api.ajax({
      method: 'post',
      url: '/api/public/provincecityareaitems',
      body: {
        parentId: parentId
      }
    });
   }
  // 点击省级城市
    chosePro(name: string, id: number, index: number) {
       this.achieveData(id).subscribe(res => {
         this.citydata = res.content;
         this.proName = name;
         this.proId = id;
         this.proindex = index;
       });
    }
    // 点击市级城市
    choseCity(name: string, id: number, index: number) {
       this.achieveData(id).subscribe(res => {
         this.areadata = res.content;
         this.cityName = name;
         this.cityId = id;
         this.cityindex = index;
       });
    }
    // 点击区级城市
    choseArea(name: string, id: number, index: number) {
      this.areaName = name;
      this.areaId = id;
      this.areaindex = index;
    }

}
