import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  appTag: string = window['appTag'];
  app: object = window['appInfo'];
  headerBottom: string;
  @Input() autoNav: boolean;
  @Input() hasCar: boolean;
  @Input() headerTitle: string;
  @Input() hasBack: boolean;
  @Input() hasBottom: boolean;
  constructor(
    private location: Location
  ) { }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    if (this.hasBottom) {
      this.headerBottom = '.05rem solid #dbdbdb';
    }
  }

}
