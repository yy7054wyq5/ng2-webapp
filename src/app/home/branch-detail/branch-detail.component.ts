import { LoadingService } from './../../share/service/loading.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

declare var BMap: any;

@Component({
  selector: 'app-branch-detail',
  templateUrl: './branch-detail.component.html',
  styleUrls: ['./branch-detail.component.less']
})
export class BranchDetailComponent implements OnInit {
  detail: any;
  app: object = window['appInfo'];
  appIcon: string; // 商户图标
  map: any;
  point: any;
  mapHeight: number; // 地图高度
  initMapHeight: number;
  arrowDown = false;
  detailHeight = 3.6;

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingService
  ) { }

  _getMapSbilingsElemHeight(className: string): number {
    const classArr = className.split(',');
    let totalHeight = 0;
    for (let i = 0; i < classArr.length; i++) {
      const elems = document.getElementsByClassName(classArr[i]);
      for (let j = 0; j < elems.length; j++) {
        totalHeight += elems[j].clientHeight;
      }
    }
    return totalHeight + 5; // 5px偏差
  }

  setMapHeight() {
    this.arrowDown = !this.arrowDown;
    if (this.arrowDown) {
      this.detailHeight = 0;
      this.mapHeight = window.innerHeight - this._getMapSbilingsElemHeight('arrow,seat');
    } else {
      this.detailHeight = 3.6;
      this.mapHeight = this.initMapHeight;
    }
  }

  toBranchLine () {
    const loading = this.loading;
    const map = this.map;
    const point = this.point;
    // 定位
    loading.show();
    const geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r: object) {
      if (this.getStatus() === 0) {
        const walking = new BMap.WalkingRoute(map, {
          renderOptions: {
            map: map,
            autoViewport: true
          }
        });
        walking.search(r['point'], point);
        loading.hide();
      } else {
        alert(this.getStatus());
      }
    },
    {
      enableHighAccuracy: true
    });
  };

  ngOnInit() {
    this.route.data
      .subscribe(res => {
        this.detail = res.content;
        this.mapHeight = window.innerHeight - this._getMapSbilingsElemHeight('detail,seat,arrow');
        this.initMapHeight = this.mapHeight;
        // 百度地图API功能
        const map = new BMap.Map('map'); // 创建Map实例
        // 初始化地图,设置中心点坐标和地图级别
        map.centerAndZoom(new BMap.Point(this.detail['addressLng'], this.detail['addressLat']), 17);
        map.setCurrentCity('北京'); // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
        if (this.app['iconId']) {
          this.appIcon = 'http://appbuilder.loongjoy.com/image/get/' + this.app['iconId'];
        } else {
          this.appIcon = 'assets/img/branches_icon_shop_nor.png';
        }
        const icon = new BMap.Icon(this.appIcon, new BMap.Size(40, 40));
        const point = new BMap.Point(this.detail['addressLng'], this.detail['addressLat']); // 当前分店坐标
        const marker = new BMap.Marker(point, {
          icon: icon
        });
        map.addOverlay(marker);
        map.panTo(point);
        this.map = map;
        this.point = point;
      });
  }

}
